<?php

namespace App;

use PDO;

class Database
{
    private $connection;
    private $statement;

    public function __construct()
    {
        $dbConfig = require __DIR__ . '/config/database.php';

        $dsn = sprintf(
            'mysql:host=%s;port=%s;dbname=%s;charset=%s',
            $dbConfig['host'] ?? 'localhost',
            $dbConfig['port'] ?? '3306',
            $dbConfig['dbname'] ?? '',
            $dbConfig['charset'] ?? 'utf8mb4'
        );

        $user = $dbConfig['user'] ?? null;
        $password = $dbConfig['password'] ?? null;

        try {
            $this->connection = new PDO($dsn, $user, $password, [
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            ]);
        } catch (\Exception $e) {
            abort(500, 'Database connection failed: ' . $e->getMessage());
        }
    }

    public function query($query, $params = [])
    {
        $this->statement = $this->connection->prepare($query);
        $this->statement->execute($params);

        return $this;
    }

    public function get()
    {
        return $this->statement->fetchAll();
    }

    public function fetch()
    {
        return $this->statement->fetch();
    }

    public function fetchOrFail()
    {
        $result = $this->fetch();

        if (!$result) {
            abort();
        }

        return $result;
    }

    public function fetchColumn()
    {
        return $this->statement->fetchColumn();
    }

    public function getLastInsertId()
    {
        return $this->connection->lastInsertId();
    }

    public function beginTransaction()
    {
        return $this->connection->beginTransaction();
    }

    public function commit()
    {
        return $this->connection->commit();
    }

    public function rollback()
    {
        return $this->connection->rollBack();
    }
}