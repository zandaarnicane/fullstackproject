<?php

session_start();

// CORS konfigurācija
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Origin: *');

// Pre-flight OPTIONS pieprasījums
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

require_once __DIR__ . '/../vendor/autoload.php';

define('BASE_PATH', dirname(__DIR__) . '/');

// Ielādē .env
Dotenv\Dotenv::createImmutable(BASE_PATH)->load();

// FastRoute maršrutu reģistrācija
$dispatcher = FastRoute\simpleDispatcher(function(FastRoute\RouteCollector $r) {

    // ✅ Mājaslapas maršruts
    $r->get('/', function() {
        // Ja tev ir React build:
        $indexPath = BASE_PATH . 'public/index.html';
        if (file_exists($indexPath)) {
            require $indexPath;
        } else {
            echo 'Sveicināts Fullstack projektā! 🎉';
        }
        exit;
    });

    // ✅ GraphQL POST maršruts
    $r->post('/graphql', [App\Controller\GraphQL::class, 'handle']);
});

// Maršruta apstrāde
$routeInfo = $dispatcher->dispatch(
    $_SERVER['REQUEST_METHOD'],
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)
);

switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        // Ja tiek pieprasīts statisks fails (bildes, .js, .css utt.)
        if (preg_match('/\.(?:css|js|png|jpg|jpeg|gif|ico)$/', $_SERVER['REQUEST_URI'])) {
            setMimeType($_SERVER['REQUEST_URI']);
            readfile(BASE_PATH . 'public' . $_SERVER['REQUEST_URI']);
            exit;
        }

        http_response_code(404);
        echo "Page Not Found";
        break;

    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        http_response_code(405);
        echo "Method Not Allowed";
        break;

    case FastRoute\Dispatcher::FOUND:
        $handler = $routeInfo[1];
        $vars = $routeInfo[2];
        echo $handler($vars);
        break;
}

// Funkcija MIME tipiem statiskajiem failiem
function setMimeType($filename)
{
    $mime_types = [
        'css' => 'text/css',
        'js' => 'application/javascript',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif' => 'image/gif',
        'ico' => 'image/x-icon',
    ];

    $ext = pathinfo($filename, PATHINFO_EXTENSION);
    header('Content-Type: ' . ($mime_types[$ext] ?? 'application/octet-stream'));
}
