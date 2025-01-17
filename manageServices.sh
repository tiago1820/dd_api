#!/bin/bash

case "$1" in
    start)
        echo "Starting services..."
        sudo systemctl start mysql.service
        sudo systemctl start postgresql.service
        sudo systemctl start redis-server.service
        echo "Services started."
        ;;
    stop)
        echo "Stopping services..."
        sudo systemctl stop mysql.service
        sudo systemctl stop postgresql.service
        sudo systemctl stop redis-server.service
        echo "Services stopped."
        ;;
    *)
        echo "Usage: $0 {start|stop}"
        exit 1
        ;;
esac