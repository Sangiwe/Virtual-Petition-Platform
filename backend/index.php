<?php
// Configuration
$db_host = 'localhost';
$db_username = 'root';
$db_password = 'your_password';
$db_name = 'virtual_petition_platform';

// Create a connection to the database
$conn = new mysqli($db_host, $db_username, $db_password, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// API endpoint to retrieve all petitions
$app->get('/petitions', function() use ($conn) {
    $sql = "SELECT * FROM petitions";
    $result = $conn->query($sql);
    $petitions = array();
    while($row = $result->fetch_assoc()) {
        $petitions[] = $row;
    }
    echo json_encode($petitions);
});

// API endpoint to retrieve a single petition
$app->get('/petitions/:id', function($id) use ($conn) {
    $sql = "SELECT * FROM petitions WHERE id = '$id'";
    $result = $conn->query($sql);
    $petition = $result->fetch_assoc();
    echo json_encode($petition);
});

// API endpoint to create a new petition
$app->post('/petitions', function() use ($conn) {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $goal = $_POST['goal'];
    $sql = "INSERT INTO petitions (title, description, goal) VALUES ('$title', '$description', '$goal')";
    $conn->query($sql);
    echo json_encode(array('message' => 'Petition created successfully'));
});

// API endpoint to sign a petition
$app->post('/signatures', function() use ($conn) {
    $user_id = $_POST['user_id'];
    $petition_id = $_POST['petition_id'];
    $sql = "INSERT INTO signatures (user_id, petition_id) VALUES ('$user_id', '$petition_id')";
    $conn->query($sql);
    echo json_encode(array('message' => 'Signature added successfully'));
});

// Close the database connection
$conn->close();
?>