CREATE USER IF NOT EXISTS 'mysqld_exporter'@'%' IDENTIFIED BY 'exporterpass';
ALTER USER 'mysqld_exporter'@'%' IDENTIFIED BY 'exporterpass';
GRANT PROCESS, REPLICATION CLIENT, SELECT ON *.* TO 'mysqld_exporter'@'%';
GRANT SELECT ON performance_schema.* TO 'mysqld_exporter'@'%';
FLUSH PRIVILEGES;
