#!/bin/bash

set -e

mkdir build
echo "empty build image" >> build/contacts_docker_image.tar
cp scripts/packaging/install-image-contacts.sh build/install-image-contacts.sh
cp -r scripts/deployment build/deployment
