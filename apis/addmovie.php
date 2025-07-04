<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$servername = "localhost";
$username = "hybrid_160422007";
$password = "ubaya";
$dbname = "hybrid_160422007";

$desktop_dir = "/var/www/html/hybrid/160422007/assets/movies/desktop/";
$mobile_dir = "/var/www/html/hybrid/160422007/assets/movies/mobile/";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["result" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

extract($_POST);
$poster_placeholder = ""; 
$stmt = $conn->prepare(
    "INSERT INTO movies (title, genre, poster, release_date, average_rating, director, synopsis, trailer_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
);
$stmt->bind_param("ssssdsss", $title, $genre, $poster_placeholder, $release_date, $average_rating, $director, $synopsis, $trailer);

if ($stmt->execute()) {
    $movie_id = $conn->insert_id;
    $success = true; 
    $arr = [];

    // --- PROSES FILE UPLOAD (SEKARANG OPSIONAL) ---
    // Hanya jalankan blok ini jika kedua file poster ada dan berhasil diunggah tanpa error.
    if (isset($_FILES['poster_desktop']) && $_FILES['poster_desktop']['error'] == 0 &&
        isset($_FILES['poster_mobile']) && $_FILES['poster_mobile']['error'] == 0) {
        
        $desktop_ext = pathinfo($_FILES['poster_desktop']['name'], PATHINFO_EXTENSION);
        $mobile_ext = pathinfo($_FILES['poster_mobile']['name'], PATHINFO_EXTENSION);
        
        $new_poster_filename = "p_" . $movie_id . "." . $desktop_ext;
        
        $desktop_target_path = $desktop_dir . $new_poster_filename;
        $mobile_target_path = $mobile_dir . "p_" . $movie_id . "." . $mobile_ext;

        // Pindahkan file dan update database
        if (move_uploaded_file($_FILES['poster_desktop']['tmp_name'], $desktop_target_path) && move_uploaded_file($_FILES['poster_mobile']['tmp_name'], $mobile_target_path)) {
            $stmt_update = $conn->prepare("UPDATE movies SET poster = ? WHERE id = ?");
            $stmt_update->bind_param("si", $new_poster_filename, $movie_id);

            // Jika update gagal, anggap seluruh proses gagal
            if (!$stmt_update->execute()) {
                $success = false;
                $arr = ["result" => "error", "message" => "Gagal memperbarui nama poster di database."];
            }
            $stmt_update->close();
        } else {
            // Jika pemindahan file gagal, anggap seluruh proses gagal
            $success = false;
            $arr = ["result" => "error", "message" => "Gagal memindahkan file poster yang diunggah."];
        }
    }

    // --- INSERT DATA CASTING (HANYA JIKA PROSES SEBELUMNYA SUKSES) ---
    if ($success) {
        $actorArray = isset($_POST['actor']) ? $_POST['actor'] : [];
        $roleArray = isset($_POST['role']) ? $_POST['role'] : [];
        $imageArray = isset($_POST['image']) ? $_POST['image'] : [];

        for ($i = 0; $i < count($actorArray); $i++) {
            $actor = $actorArray[$i];
            $role = $roleArray[$i];
            $image = $imageArray[$i];

            $stmt2 = $conn->prepare("INSERT INTO casting (movie_id, actor, role, image) VALUES (?, ?, ?, ?)");
            $stmt2->bind_param("isss", $movie_id, $actor, $role, $image);

            if (!$stmt2->execute()) {
                $success = false;
                $arr = ["result" => "error", "message" => "Gagal simpan data casting untuk aktor: " . $actor];
                break; 
            }
            $stmt2->close();
        }
        
        if ($success) {
            $arr = ["result" => "success", "movie_id" => $movie_id];
        }
    }
} else {
    $arr = ["result" => "error", "message" => "Gagal simpan data movies: " . $stmt->error];
}

echo json_encode($arr);
$stmt->close();
$conn->close();
?>
