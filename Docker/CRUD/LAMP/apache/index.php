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
  <!-- Tailwind CDN for quick styling -->
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-slate-100">
  <div class="max-w-6xl mx-auto p-6">
    <h1 class="text-3xl font-extrabold mb-4 text-white">PHP + MySQL CRUD</h1>
  <?php if ($message): ?>
    <div class="mb-4 p-3 rounded text-green-200 bg-green-800/30 font-semibold"><?php echo htmlspecialchars($message); ?></div>
  <?php endif; ?>
  <form method="post" action="" class="bg-white/5 backdrop-blur-md p-6 rounded-lg shadow-md max-w-md">
    <input type="hidden" name="action" value="<?php echo $currentRecord ? 'update' : 'create'; ?>">
    <?php if ($currentRecord): ?>
      <input type="hidden" name="id" value="<?php echo (int) $currentRecord['id']; ?>">
    <?php endif; ?>
    <label for="name" class="block text-sm font-medium text-slate-200 mb-2">Name</label>
    <input id="name" name="name" type="text" value="<?php echo htmlspecialchars($currentRecord['name'] ?? ''); ?>" required class="w-full px-3 py-2 mb-3 rounded-md bg-white/5 border border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400">
    <label for="email" class="block text-sm font-medium text-slate-200 mb-2">Email</label>
    <input id="email" name="email" type="email" value="<?php echo htmlspecialchars($currentRecord['email'] ?? ''); ?>" required class="w-full px-3 py-2 mb-3 rounded-md bg-white/5 border border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400">
    <div class="flex items-center">
      <button type="submit" class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md font-semibold"><?php echo $currentRecord ? 'Update' : 'Create'; ?> Record</button>
      <?php if ($currentRecord): ?>
        <a href="index.php" class="ml-3 text-sm text-indigo-200 hover:underline">Cancel</a>
      <?php endif; ?>
    </div>
  </form>
  <div class="mt-8 overflow-x-auto">
    <table class="min-w-full divide-y divide-slate-700 bg-white/5 rounded-lg overflow-hidden">
      <thead class="bg-white/3">
        <tr>
          <th class="px-4 py-3 text-left text-sm font-semibold text-slate-200">ID</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-slate-200">Name</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-slate-200">Email</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-slate-200">Created</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-slate-200">Updated</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-slate-200">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-700">
    <?php if (count($records) === 0): ?>
      <tr>
        <td colspan="6">No records yet.</td>
      </tr>
    <?php else: ?>
      <?php foreach ($records as $row): ?>
        <tr class="odd:bg-white/2 even:bg-transparent">
          <td class="px-4 py-3 text-sm text-slate-100"><?php echo (int) $row['id']; ?></td>
          <td class="px-4 py-3 text-sm text-slate-100"><?php echo htmlspecialchars($row['name']); ?></td>
          <td class="px-4 py-3 text-sm text-slate-100"><?php echo htmlspecialchars($row['email']); ?></td>
          <td class="px-4 py-3 text-sm text-slate-100"><?php echo htmlspecialchars($row['created_at']); ?></td>
          <td class="px-4 py-3 text-sm text-slate-100"><?php echo htmlspecialchars($row['updated_at']); ?></td>
          <td class="px-4 py-3 text-sm">
            <a href="?edit=<?php echo (int) $row['id']; ?>" class="text-indigo-300 hover:underline mr-2">Edit</a>
            <a href="?delete=<?php echo (int) $row['id']; ?>" onclick="return confirm('Delete this record?');" class="text-red-300 hover:underline">Delete</a>
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
