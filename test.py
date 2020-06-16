#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    print(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))+'\\xyz')

if __name__ == '__main__':
    main()
