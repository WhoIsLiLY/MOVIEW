<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$servername = "localhost";
$username = "hybrid_160422007";
$password = "ubaya";
$dbname = "hybrid_160422007";

// --- LOKASI FOLDER ASET ---
$desktop_dir = "/var/www/html/hybrid/160422007/assets/movies/desktop/";
$mobile_dir = "/var/www/html/hybrid/160422007/assets/movies/mobile/";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["result" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

extract($_POST); // Dapatkan $id, $title, $poster (URL lama), dll.

$success = true; // Asumsikan sukses di awal
$arr = [];
$poster_url_to_save = $poster; // Default: gunakan URL poster lama jika tidak ada file baru

// --- 1. PROSES FILE POSTER BARU (JIKA DIUNGGAH) ---
if (isset($_FILES['poster_desktop']) && $_FILES['poster_desktop']['error'] == 0 &&
    isset($_FILES['poster_mobile']) && $_FILES['poster_mobile']['error'] == 0) {
    
    // a. Hapus file poster lama terlebih dahulu
    $desktop_pattern = $desktop_dir . "p_" . $id . ".*";
    $mobile_pattern = $mobile_dir . "p_" . $id . ".*";
    $files_to_delete = array_merge(glob($desktop_pattern), glob($mobile_pattern));
    foreach ($files_to_delete as $file) {
        if (file_exists($file)) unlink($file);
    }

    // b. Proses file baru (logika sama seperti 'add')
    $desktop_ext = pathinfo($_FILES['poster_desktop']['name'], PATHINFO_EXTENSION);
    $mobile_ext = pathinfo($_FILES['poster_mobile']['name'], PATHINFO_EXTENSION);
    
    $new_poster_filename = "p_" . $id . "." . $desktop_ext;
    
    $desktop_target_path = $desktop_dir . $new_poster_filename;
    $mobile_target_path = $mobile_dir . "p_" . $id . "." . $mobile_ext;

    // c. Buat URL publik baru dan pindahkan file
    if (move_uploaded_file($_FILES['poster_desktop']['tmp_name'], $desktop_target_path) && move_uploaded_file($_FILES['poster_mobile']['tmp_name'], $mobile_target_path)) {
        // Jika berhasil, perbarui variabel URL yang akan disimpan ke DB
        $poster_url_to_save = "https://ubaya.xyz/hybrid/160422007/assets/movies/desktop/" . $new_poster_filename;
    } else {
        $success = false;
        $arr = ["result" => "error", "message" => "Gagal memindahkan file poster baru yang diunggah."];
    }
}

// --- 2. UPDATE DATA (HANYA JIKA TIDAK ADA ERROR SEBELUMNYA) ---
if ($success) {
    // Gunakan $poster_url_to_save yang berisi URL lama atau URL baru
    $stmt = $conn->prepare(
        "UPDATE movies SET title=?, genre=?, poster=?, release_date=?, average_rating=?, director=?, synopsis=?, trailer_url=? WHERE id=?"
    );
    $stmt->bind_param("ssssdsssi", $title, $genre, $poster_url_to_save, $release_date, $average_rating, $director, $synopsis, $trailer, $id);

    if ($stmt->execute()) {
        // --- 3. UPDATE CASTING: HAPUS LAMA, INSERT BARU ---
        $stmtDelete = $conn->prepare("DELETE FROM casting WHERE movie_id = ?");
        $stmtDelete->bind_param("i", $id);
        $stmtDelete->execute();
        $stmtDelete->close();

        // Insert casting baru
        if (isset($_POST['actor']) && isset($_POST['role'])) {
            $actorArray = $_POST['actor'];
            $roleArray = $_POST['role'];
            $imageArray = isset($_POST['image']) ? $_POST['image'] : array_fill(0, count($actorArray), '');

            for ($i = 0; $i < count($actorArray); $i++) {
                $actor = $actorArray[$i];
                $role = $roleArray[$i];
                $image = $imageArray[$i] ?? '';

                $stmtInsert = $conn->prepare("INSERT INTO casting (movie_id, actor, role, image) VALUES (?, ?, ?, ?)");
                $stmtInsert->bind_param("isss", $id, $actor, $role, $image);
                $stmtInsert->execute();
                $stmtInsert->close();
            }
        }
        $arr = ["result" => "success", "message" => "Data film berhasil diperbarui."];

    } else {
        $arr = ["result" => "error", "message" => "Gagal memperbarui data film di database."];
    }
    $stmt->close();
}

echo json_encode($arr);
$conn->close();
?>