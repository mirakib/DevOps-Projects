<?php
$servername = "mysql";
$username = "root";
$password = "rootpass";
$dbname = "mydb";

$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error) {
  die("Database connection failed: " . $conn->connect_error);
}
$conn->query("CREATE DATABASE IF NOT EXISTS `$dbname`");
$conn->select_db($dbname);
$conn->query("CREATE TABLE IF NOT EXISTS contacts (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(150) NOT NULL UNIQUE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)");

$message = "";
$currentRecord = null;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $action = $_POST["action"] ?? "create";
  $name = trim($_POST["name"] ?? "");
  $email = trim($_POST["email"] ?? "");
  $id = $_POST["id"] ?? null;
  if ($name === "" || $email === "") {
    $message = "Name and email are required.";
  } else {
    if ($action === "update" && $id) {
      $stmt = $conn->prepare("UPDATE contacts SET name = ?, email = ? WHERE id = ?");
      $stmt->bind_param("ssi", $name, $email, $id);
      if ($stmt->execute()) {
        $message = "Record updated.";
      } else {
        $message = "Update failed: " . $stmt->error;
      }
      $stmt->close();
    } else {
      $stmt = $conn->prepare("INSERT INTO contacts (name, email) VALUES (?, ?)");
      $stmt->bind_param("ss", $name, $email);
      if ($stmt->execute()) {
        $message = "Record created.";
      } else {
        $message = "Create failed: " . $stmt->error;
      }
      $stmt->close();
    }
  }
}

if (isset($_GET["delete"])) {
  $deleteId = (int) $_GET["delete"];
  if ($deleteId > 0) {
    $stmt = $conn->prepare("DELETE FROM contacts WHERE id = ?");
    $stmt->bind_param("i", $deleteId);
    if ($stmt->execute()) {
      $message = "Record deleted.";
    } else {
      $message = "Delete failed: " . $stmt->error;
    }
    $stmt->close();
  }
}

if (isset($_GET["edit"])) {
  $editId = (int) $_GET["edit"];
  if ($editId > 0) {
    $stmt = $conn->prepare("SELECT id, name, email FROM contacts WHERE id = ?");
    $stmt->bind_param("i", $editId);
    $stmt->execute();
    $result = $stmt->get_result();
    $currentRecord = $result->fetch_assoc();
    $stmt->close();
  }
}

$records = [];
$result = $conn->query("SELECT id, name, email, created_at, updated_at FROM contacts ORDER BY created_at DESC");
if ($result) {
  $records = $result->fetch_all(MYSQLI_ASSOC);
  $result->free();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>LAMP CRUD MONITORING</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #1a202c; }
    h1 { color: #2d3748; }
    form { margin-bottom: 20px; padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 400px; }
    label { display: block; margin-bottom: 8px; font-weight: 600; }
    input { width: 100%; padding: 8px; margin-bottom: 12px; border: 1px solid #cbd5e0; border-radius: 4px; }
    button { padding: 8px 16px; border: none; border-radius: 4px; background-color: #3182ce; color: #fff; cursor: pointer; }
    table { border-collapse: collapse; width: 100%; margin-top: 24px; }
    th, td { border: 1px solid #e2e8f0; padding: 10px; text-align: left; }
    th { background-color: #edf2f7; }
    a { color: #2b6cb0; text-decoration: none; }
    .message { margin-bottom: 16px; color: #2f855a; font-weight: 600; }
  </style>
</head>
<body>
  <h1>PHP + MySQL CRUD</h1>
  <?php if ($message): ?>
    <div class="message"><?php echo htmlspecialchars($message); ?></div>
  <?php endif; ?>
  <form method="post" action="">
    <input type="hidden" name="action" value="<?php echo $currentRecord ? 'update' : 'create'; ?>">
    <?php if ($currentRecord): ?>
      <input type="hidden" name="id" value="<?php echo (int) $currentRecord['id']; ?>">
    <?php endif; ?>
    <label for="name">Name</label>
    <input id="name" name="name" type="text" value="<?php echo htmlspecialchars($currentRecord['name'] ?? ''); ?>" required>
    <label for="email">Email</label>
    <input id="email" name="email" type="email" value="<?php echo htmlspecialchars($currentRecord['email'] ?? ''); ?>" required>
    <button type="submit"><?php echo $currentRecord ? 'Update' : 'Create'; ?> Record</button>
    <?php if ($currentRecord): ?>
      <a href="index.php" style="margin-left:12px;">Cancel</a>
    <?php endif; ?>
  </form>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Created</th>
        <th>Updated</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    <?php if (count($records) === 0): ?>
      <tr>
        <td colspan="6">No records yet.</td>
      </tr>
    <?php else: ?>
      <?php foreach ($records as $row): ?>
        <tr>
          <td><?php echo (int) $row['id']; ?></td>
          <td><?php echo htmlspecialchars($row['name']); ?></td>
          <td><?php echo htmlspecialchars($row['email']); ?></td>
          <td><?php echo htmlspecialchars($row['created_at']); ?></td>
          <td><?php echo htmlspecialchars($row['updated_at']); ?></td>
          <td>
            <a href="?edit=<?php echo (int) $row['id']; ?>">Edit</a>
            |
            <a href="?delete=<?php echo (int) $row['id']; ?>" onclick="return confirm('Delete this record?');">Delete</a>
          </td>
        </tr>
      <?php endforeach; ?>
    <?php endif; ?>
    </tbody>
  </table>
</body>
</html>
<?php
$conn->close();
?>
