-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 20, 2019 at 02:50 PM
-- Server version: 8.0.15
-- PHP Version: 7.2.15-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `status`, `updatedAt`) VALUES
(1, 'Admin One', 'adminone@mail.com', '$2b$10$t3u3mRXsdzl.zk.8MPh4zu2t4tItcUa0Dzj2.g8./G9z.aJviOTzS', NULL, '2019-02-01 17:59:43'),
(2, 'Admin One', 'adminone@mail.com', '$2b$10$6AhvRFHfDtBDRzvMx3TkceW/uoLbJly8rBnq.ndZUxT6rawHLBU.6', NULL, '2019-02-03 02:26:36');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `parent_id`, `status`, `updatedAt`) VALUES
(2, 'Category Two', NULL, NULL, NULL),
(3, 'Category Three', NULL, NULL, NULL),
(4, 'Category Four', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` longtext COLLATE utf8_unicode_ci NOT NULL,
  `township_id` int(11) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `total_amount` float NOT NULL,
  `discount` float DEFAULT NULL,
  `payment_method` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `total_amount`, `discount`, `payment_method`, `status`, `updatedAt`) VALUES
(2, 7, 4201680, NULL, 1, NULL, '2019-02-16 10:51:10'),
(3, 7, 4201680, NULL, 1, NULL, '2019-02-17 08:53:02');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `price` float NOT NULL,
  `sub_total` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `qty`, `price`, `sub_total`, `status`, `updatedAt`) VALUES
(1, 2, 8, 6, 695854, 4175120, NULL, '2019-02-16 10:51:11'),
(2, 2, 7, 4, 5990, 23960, NULL, '2019-02-16 10:51:11'),
(3, 2, 3, 2, 1300, 2600, NULL, '2019-02-16 10:51:11'),
(4, 3, 8, 6, 695854, 4175120, NULL, '2019-02-17 08:53:02'),
(5, 3, 7, 4, 5990, 23960, NULL, '2019-02-17 08:53:02'),
(6, 3, 3, 2, 1300, 2600, NULL, '2019-02-17 08:53:03');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `category_id` int(11) NOT NULL,
  `thumbnail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8_unicode_ci NOT NULL,
  `price` float NOT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `category_id`, `thumbnail`, `description`, `price`, `status`, `updatedAt`) VALUES
(1, 'Product One Edit Two', 2, '62d3358b64d163aa19962b5ef3a8d790', 'Product one description . Edit to two', 120012, NULL, '2019-01-29 15:02:43'),
(3, 'Product Three', 2, '41d74c0e3870628e408a59c047f0c6f9', 'Product three description', 1300, NULL, '2019-01-29 15:11:46'),
(4, 'Product Four', 4, 'f558db81146e33b25dece05d4256e377', 'Product Four Description', 1400, NULL, '2019-01-29 15:27:29'),
(5, 'Product Test One', 3, 'e0caf5bbbb57538f1ec3e9858bf7f5eb', 'Good Test One', 1500, NULL, '2019-02-01 18:51:19'),
(6, 'Pagination test Two', 4, '53198505ed8ac4cb698dbe11a1b41566', 'Good Pagination test two', 699, NULL, '2019-02-01 18:53:13'),
(7, 'Pagination test Three', 3, 'fd29ed2c27945dfefe2f4676ce29a003', 'Good Test three', 5990, NULL, '2019-02-01 18:53:52'),
(8, 'Pg Test Four', 3, '628672ba75ac3e2a72214e8b3b298388', 'Pg test Description', 695854, NULL, '2019-02-01 18:58:59');

-- --------------------------------------------------------

--
-- Table structure for table `townships`
--

CREATE TABLE `townships` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `townships`
--

INSERT INTO `townships` (`id`, `name`, `status`, `updatedAt`) VALUES
(2, 'Township One', NULL, '2019-02-01 16:00:44'),
(3, 'Township Two', NULL, '2019-02-01 16:12:24'),
(4, 'Township Three', NULL, '2019-02-01 16:12:44');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` longtext COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `phone`, `email`, `password`, `address`, `status`, `role`, `updatedAt`) VALUES
(1, 'Ra Wai Kyaw', '7898798798', 'rawaikyaw@gmail.com', '$2b$10$7CIQ85bDmtDPeNi6DqbxVeF5ufbrfTs/td.v5le03ZprWOgJMWoIy', 'Yangon Myanmar', NULL, NULL, '2019-02-03 06:33:33'),
(2, 'Ra Wai Kyaw', '7987897', 'rawai@mail.com', '$2a$10$4HMAtJo..U4/XJTS66A9MOZLyLTq85rhQhOGrG7LrqgnE65nBnwge', 'Yangon Myanmar', NULL, NULL, '2019-02-03 10:14:25'),
(3, 'Ra Wai Kyaw', '7987897', 'rawai@mail.com', '$2a$10$cbNIGhBE3juCyGA3Yn/9Vu5ncMnV/jPMfF6zcv6.muXlyDdjaSTt.', 'Yangon Myanmar', NULL, NULL, '2019-02-03 10:14:37'),
(4, 'Ra Wai Kyaw Testing', '7987897', 'rawai@mail.com', '$2a$10$jfb0OU854RPj3tnSuJdNQulvcuEDTreSokxkZ8/dDJhYu2VNb4.1K', 'Yangon Myanmar', NULL, NULL, '2019-02-03 10:15:14'),
(5, 'Register One', '123123123', 'registerone@mail.com', '$2a$10$u.QnY5jB.j6kPT/AcPcH4e5dWp173liT4/jsSlIjsTtu84PfBIx9u', 'yangon myanmar', NULL, NULL, '2019-02-09 09:49:11'),
(6, 'Register One', '123123123', 'registerone@mail.com', '$2a$10$ZMWJ0ddj1id7VG5RIRed1OpP/rgnMah04zDyuzb8nXD0LnRRjAMRK', 'yangon myanmar', NULL, NULL, '2019-02-09 09:49:15'),
(7, 'Test Two Edit Edit', '123123', 'testtwo@mail.com', '$2a$10$SQG/Y7Gxn02OeK.vIsmJXeCRb/oIPzlsZPbUALmKAPkNzQdgY71Xe', 'yangon myanmr', NULL, NULL, '2019-02-10 10:40:25'),
(8, 'Ra Wai Kyaw', '123123123', 'rawai@gmail.com', '$2a$10$i7SMjEc57qvxdJfVGWaUpeYOOlQ/bpGXykPILY7/5GrTz2yeJd1ki', 'Yangon', NULL, NULL, '2019-02-16 09:52:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `townships`
--
ALTER TABLE `townships`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `townships`
--
ALTER TABLE `townships`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
