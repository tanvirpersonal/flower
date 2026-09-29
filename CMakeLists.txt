cmake_minimum_required(VERSION 3.20)

project(AtomicEngine
    VERSION 0.1.0
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Debug)
endif()

# Engine executable
add_executable(AtomicEngine
    main.cpp
)

# Compiler warnings
if(CMAKE_CXX_COMPILER_ID MATCHES "GNU|Clang")
    target_compile_options(AtomicEngine PRIVATE
        -Wall
        -Wextra
        -Wpedantic
    )
endif()