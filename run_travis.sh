#!/usr/bin/env bash

sh ./install_external_travis.sh

nosetests tests/unit_tests
