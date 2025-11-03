<?php
// src/public/index.php
declare(strict_types=1);

$host = getenv('DB_HOST') ?: 'db';
$db   = getenv('DB_NAME') ?: 'appdb';
$user = getenv('DB_USER') ?: 'appuser';
$pass = getenv('DB_PASS') ?: 'apppassword';
$charset = 'utf8mb4';
$dsn = "mysql:host={$host};dbname={$db};charset={$charset}";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    http_response_code(500);
    echo "<h1>DB connection failed</h1>";
    echo "<pre>" . htmlspecialchars($e->getMessage()) . "</pre>";
    exit;
}

$action = $_REQUEST['action'] ?? '';

function redirect($url = '/'){
    header("Location: $url");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($action === 'create' && !empty($_POST['email'])) {
        $email = trim($_POST['email']);
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $stmt = $pdo->prepare("INSERT IGNORE INTO emails (email) VALUES (:email)");
            $stmt->execute(['email' => $email]);
        }
        redirect('/');
    } elseif ($action === 'update' && !empty($_POST['email']) && !empty($_POST['id'])) {
        $id = (int)$_POST['id'];
        $email = trim($_POST['email']);
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $stmt = $pdo->prepare("UPDATE emails SET email = :email WHERE id = :id");
            $stmt->execute(['email' => $email, 'id' => $id]);
        }
        redirect('/');
    }
} else {
    if ($action === 'delete' && isset($_GET['id'])) {
        $id = (int)$_GET['id'];
        $stmt = $pdo->prepare("DELETE FROM emails WHERE id = :id");
        $stmt->execute(['id' => $id]);
        redirect('/');
    }
    if ($action === 'edit' && isset($_GET['id'])) {
        $id = (int)$_GET['id'];
        $stmt = $pdo->prepare("SELECT * FROM emails WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);
        $editItem = $stmt->fetch();
    }
}

$stmt = $pdo->query("SELECT id, email, created_at FROM emails ORDER BY created_at DESC");
$emails = $stmt->fetchAll();

?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>LEMP CRUD</title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>LEMP CRUD BY MOSHREKUL ISLAM</h1>

      <!-- FORM: center -->
      <?php if (!empty($editItem)): ?>
        <form method="post" action="?action=update" class="form">
          <input type="hidden" name="id" value="<?=htmlspecialchars($editItem['id'])?>">
          <input name="email" value="<?=htmlspecialchars($editItem['email'])?>" required type="email" placeholder="Update email">
          <div class="buttons">
            <button type="submit" class="btn primary">Update</button>
            <a href="/" class="btn link">Cancel</a>
          </div>
        </form>
      <?php else: ?>
        <form method="post" action="?action=create" class="form">
          <input name="email" required type="email" placeholder="Enter your email">
          <button type="submit" class="btn primary">Submit</button>
        </form>
      <?php endif; ?>

      <hr>

      <!-- LIST -->
      <?php if (count($emails) === 0): ?>
        <p class="muted">No emails yet.</p>
      <?php else: ?>
        <ul class="list">
          <?php foreach ($emails as $row): ?>
            <li>
              <div class="left">
                <div class="email"><?=htmlspecialchars($row['email'])?></div>
                <div class="meta"><?=htmlspecialchars($row['created_at'])?></div>
              </div>
              <div class="right">
                <a href="?action=edit&id=<?=urlencode($row['id'])?>" class="btn small">Edit</a>
                <a href="?action=delete&id=<?=urlencode($row['id'])?>" onclick="return confirm('Delete?');" class="btn small danger">Delete</a>
              </div>
            </li>
          <?php endforeach; ?>
        </ul>
      <?php endif; ?>

    </div>
  </div>
</body>
</html>
