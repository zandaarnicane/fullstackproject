
<?php

namespace App\Controller\Resolvers;

class OrderResolver
{
    public static function store(array $input): string
    {
        session_start();

        // Validācija (var papildināt, ja nepieciešams)
        if (!isset($input['items']) || !is_array($input['items']) || count($input['items']) === 0) {
            return 'Kļūda: nav nevienas preces pasūtījumā.';
        }

        // Saglabā pasūtījumu sesijā (vai vēlāk – datubāzē)
        if (!isset($_SESSION['orders'])) {
            $_SESSION['orders'] = [];
        }

        $_SESSION['orders'][] = [
            'created_at' => date('Y-m-d H:i:s'),
            'items' => $input['items'],
        ];

        return 'Pasūtījums saņemts!';
    }

    public static function getAll(): array
    {
        session_start();
        return $_SESSION['orders'] ?? [];
    }
}
