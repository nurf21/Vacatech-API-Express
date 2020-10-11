-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 11, 2020 at 08:21 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacatech`
--

-- --------------------------------------------------------

--
-- Table structure for table `company_profile`
--

CREATE TABLE `company_profile` (
  `profile_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `profile_img` varchar(200) NOT NULL,
  `profile_field` varchar(200) NOT NULL,
  `profile_city` varchar(200) NOT NULL,
  `profile_desc` text NOT NULL,
  `profile_email` varchar(200) NOT NULL,
  `profile_instagram` varchar(200) NOT NULL,
  `profile_linkedin` varchar(200) NOT NULL,
  `profile_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `profile_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company_profile`
--

INSERT INTO `company_profile` (`profile_id`, `user_id`, `profile_img`, `profile_field`, `profile_city`, `profile_desc`, `profile_email`, `profile_instagram`, `profile_linkedin`, `profile_created_at`, `profile_updated_at`) VALUES
(1, 37, '2020-10-10T10-32-55.943Z-0_SnBCpaOXrQFYdFU6_.png', 'Industrial', 'Bandung', 'PT. Sukasuka adalah PT yang suka suka', 'sukasuka@gmail.com', '@sukasuka', 'sukasuka', '2020-10-10 10:33:17', '2020-10-10 10:33:17');

-- --------------------------------------------------------

--
-- Table structure for table `experience`
--

CREATE TABLE `experience` (
  `exp_id` int(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `exp_position` varchar(200) NOT NULL,
  `exp_company` varchar(200) NOT NULL,
  `exp_date` varchar(200) NOT NULL,
  `exp_desc` text NOT NULL,
  `exp_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `exp_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `experience`
--

INSERT INTO `experience` (`exp_id`, `user_id`, `exp_position`, `exp_company`, `exp_date`, `exp_desc`, `exp_created_at`, `exp_updated_at`) VALUES
(1, 33, 'Web Developer', 'Bukalapak', 'Januari 2020', 'Bekerja sebagai web developer', '2020-09-19 04:30:07', '2020-10-09 08:59:22'),
(2, 33, 'HRD', 'Shopee', 'Agustus 2020', 'Bekerja sebagai HRD', '2020-09-19 04:30:07', '2020-10-09 08:55:32'),
(3, 33, 'Manager', 'Lazada', 'October 2020', 'Test', '2020-09-19 09:42:14', '2020-10-09 09:05:13');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `msg_id` int(11) NOT NULL,
  `roomchat_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `msg` text NOT NULL,
  `msg_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`msg_id`, `roomchat_id`, `user_id`, `msg`, `msg_created_at`) VALUES
(8, 95226, 37, 'halo, nama saya dari pt abc ingin menawarkan pekerjaan', '2020-10-10 10:18:11'),
(10, 95226, 33, 'halo, saya tertarik dengan penawaran anda', '2020-10-11 05:10:20');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notif_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `status` int(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`notif_id`, `user_id`, `message`, `status`, `created_at`) VALUES
(4, 33, 'Giri Said Nurfauzan sent you a new message', 1, '2020-10-11 05:58:07'),
(5, 37, 'Nur Fauzan sent you a new message.', 1, '2020-10-11 06:11:29');

-- --------------------------------------------------------

--
-- Table structure for table `portfolio`
--

CREATE TABLE `portfolio` (
  `portfolio_id` int(30) NOT NULL,
  `user_id` int(11) NOT NULL,
  `portfolio_name` varchar(200) NOT NULL,
  `portfolio_link` varchar(250) NOT NULL,
  `portfolio_type` varchar(200) NOT NULL,
  `portfolio_img` varchar(200) NOT NULL,
  `portfolio_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `portfolio_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `portfolio`
--

INSERT INTO `portfolio` (`portfolio_id`, `user_id`, `portfolio_name`, `portfolio_link`, `portfolio_type`, `portfolio_img`, `portfolio_created_at`, `portfolio_updated_at`) VALUES
(1, 33, 'Search Engine', 'https://www.google.com', 'Aplikasi Web', 'cat2.jpg', '2020-09-19 04:05:32', '2020-09-19 04:05:32'),
(2, 33, 'Cazzy', 'https://github.com/nurf21/Cazzy-POS-App-Frontend', 'Aplikasi Web', '2020-09-19T10-25-26.705Z-unnamed.jpg', '2020-09-19 10:25:26', '2020-09-19 10:25:26'),
(3, 33, 'Fullstack', 'https://www.google.com', 'Aplikasi Web', '2020-10-09T10-07-04.749Z-Screenshot_31.png', '2020-10-09 09:18:25', '2020-10-09 10:07:04');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `profile_id` int(20) NOT NULL,
  `user_id` varchar(200) NOT NULL,
  `profile_img` varchar(200) NOT NULL,
  `profile_job` varchar(200) NOT NULL,
  `job_type` varchar(100) NOT NULL,
  `profile_address` varchar(250) NOT NULL,
  `job_address` varchar(250) NOT NULL,
  `profile_desc` varchar(300) NOT NULL,
  `profile_instagram` varchar(200) NOT NULL,
  `profile_git` varchar(200) NOT NULL,
  `profile_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `profile_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`profile_id`, `user_id`, `profile_img`, `profile_job`, `job_type`, `profile_address`, `job_address`, `profile_desc`, `profile_instagram`, `profile_git`, `profile_created_at`, `profile_updated_at`) VALUES
(6, '26', '2020-09-19T07-37-40.369Z-unnamed.jpg', 'Full Stack Developer', 'Freelance', 'Bandung', 'Bandung', 'test', '', '', '2020-09-18 01:07:15', '2020-09-18 01:07:15'),
(7, '27', 'blank-profile.jpg', 'Front End Developer', 'Full Time', 'Bogor', 'Bandung', 'test', '', '', '2020-09-18 01:08:18', '2020-09-18 01:08:18'),
(8, '28', 'blank-profile.jpg', 'Back End Developer', 'Full Time', 'Surabaya', 'Bandung', 'test', '', '', '2020-09-18 01:08:38', '2020-09-18 01:08:38'),
(9, '29', 'blank-profile.jpg', 'Full Stack Developer', 'Freelance', 'Bandung', 'Jakarta', 'test', '', '', '2020-09-18 01:10:03', '2020-09-18 01:10:03'),
(10, '30', 'blank-profile.jpg', 'Full Stack Developer', 'Freelance', 'Cirebon', 'Jakarta', 'test', '', '', '2020-09-18 01:10:09', '2020-09-18 01:10:09'),
(11, '31', 'blank-profile.jpg', 'Front End Developer', 'Full Time', 'Kalimantan', 'Jakarta', 'test', '', '', '2020-09-18 01:10:16', '2020-09-18 01:10:16'),
(12, '32', 'blank-profile.jpg', 'Front End Developer', 'Full Time', 'Surabaya', 'Jakarta', 'test', '', '', '2020-09-18 01:10:21', '2020-09-18 01:10:21'),
(13, '33', '2020-09-19T07-36-25.115Z-red-panda.jpg', 'Fullstack Developer', 'Full Time', 'Cirebon', 'Bekasi', 'Seorang Web Developer yang berdedikasi tinggi', '@girisaidn', 'nurf21', '2020-09-18 01:10:28', '2020-10-09 07:55:44'),
(15, '38', 'blank-profile.jpg', '', '', '', '', '', '', '', '2020-10-08 12:21:36', '2020-10-08 12:21:36'),
(16, '39', 'blank-profile.jpg', '', '', '', '', '', '', '', '2020-10-09 00:01:20', '2020-10-09 00:01:20'),
(17, '40', 'blank-profile.jpg', '', '', '', '', '', '', '', '2020-10-09 01:39:33', '2020-10-09 01:39:33'),
(18, '41', 'blank-profile.jpg', '', '', '', '', '', '', '', '2020-10-09 01:46:39', '2020-10-09 01:46:39'),
(19, '42', 'blank-profile.jpg', '', '', '', '', '', '', '', '2020-10-09 01:47:23', '2020-10-09 01:47:23'),
(20, '43', 'blank-profile.jpg', '', '', '', '', '', '', '', '2020-10-09 01:47:59', '2020-10-09 01:47:59'),
(21, '44', '2020-10-09T07-12-13.378Z-blkfor.jpg', 'Fullstack Developer', 'Full Time', 'Cirebon', 'Bekasi', 'Hello World', '@girisaidn', 'nurf21', '2020-10-09 02:14:41', '2020-10-09 07:13:02'),
(22, '45', '2020-10-10T04-52-49.834Z-simple.png', 'Fullstack Developer', 'Full Time', 'Cirebon', 'Bekasi', 'Test', '@girisaidn', 'nurf21', '2020-10-10 04:46:53', '2020-10-10 04:52:52');

-- --------------------------------------------------------

--
-- Table structure for table `roomchat`
--

CREATE TABLE `roomchat` (
  `id` int(11) NOT NULL,
  `roomchat_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roomchat`
--

INSERT INTO `roomchat` (`id`, `roomchat_id`, `user_id`, `created_at`, `updated_at`) VALUES
(15, 95226, 33, '2020-10-10 10:18:11', '0000-00-00 00:00:00'),
(16, 95226, 37, '2020-10-10 10:18:11', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE `skill` (
  `skill_id` int(30) NOT NULL,
  `user_id` int(30) NOT NULL,
  `skill_name` varchar(250) NOT NULL,
  `skill_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `skill_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `skill`
--

INSERT INTO `skill` (`skill_id`, `user_id`, `skill_name`, `skill_created_at`, `skill_updated_at`) VALUES
(1, 26, 'PHP', '2020-09-18 03:40:44', '2020-09-18 03:40:44'),
(2, 26, 'HTML', '2020-09-18 03:40:44', '2020-09-18 03:40:44'),
(3, 27, 'Vue', '2020-09-18 03:40:44', '2020-09-18 03:40:44'),
(4, 27, 'Express', '2020-09-18 03:40:44', '2020-09-18 03:40:44'),
(5, 27, 'HTML', '2020-09-18 03:40:44', '2020-09-18 03:40:44'),
(6, 28, 'Ruby', '2020-09-18 03:40:44', '2020-09-18 03:40:44'),
(7, 29, 'Python', '2020-09-18 03:40:44', '2020-09-18 03:40:44'),
(8, 29, 'MySQL', '2020-09-18 03:40:44', '2020-09-18 03:40:44'),
(9, 30, 'PHP', '2020-09-18 03:40:44', '2020-09-18 03:40:44'),
(10, 31, 'JavaScript', '2020-09-18 03:40:44', '2020-09-18 03:40:44'),
(11, 32, 'React', '2020-09-18 03:40:44', '2020-09-18 03:40:44'),
(17, 44, 'Backend', '2020-10-09 07:14:47', '2020-10-09 07:14:47'),
(19, 33, 'Frontend', '2020-10-09 07:55:56', '2020-10-09 07:55:56'),
(21, 33, 'Backend', '2020-10-09 08:15:36', '2020-10-09 08:15:36');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(200) NOT NULL,
  `user_password` varchar(250) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_role` int(1) NOT NULL,
  `user_phone` varchar(15) NOT NULL,
  `company_name` varchar(200) NOT NULL,
  `company_depart` varchar(200) NOT NULL,
  `user_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_status` int(1) NOT NULL,
  `user_key` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_email`, `user_password`, `user_name`, `user_role`, `user_phone`, `company_name`, `company_depart`, `user_created_at`, `user_updated_at`, `user_status`, `user_key`) VALUES
(26, 'test1@test.com', '$2b$08$W3Pj4n836lnTwE.ee51y7.lkfYU4uVgHHFMqBdF1Qs0TofBvPS8LS', 'test1', 1, '081234567890', '', '', '2020-09-18 01:07:15', '2020-09-18 01:07:15', 1, 0),
(27, 'test2@test.com', '$2b$08$BZm/Z8rSKycvvzP2GQiPjuISz4Ku/43stjXPAyplmVlkzX82hgNQa', 'test2', 1, '081234567890', '', '', '2020-09-18 01:08:18', '2020-09-18 01:08:18', 1, 0),
(28, 'test3@test.com', '$2b$08$bDFb5bKCOTuFvgcwHxSnFOYIBoYgp827jTLsdYFMb6YL65MmCAyQ6', 'test3', 1, '081234567890', '', '', '2020-09-18 01:08:38', '2020-09-18 01:08:38', 1, 0),
(29, 'test4@test.com', '$2b$08$aPxLtw3zx9dm38C5HxLEHO/U39JpLNEtYeCRbbuxCg.FQyRWDXlnS', 'test4', 1, '081234567890', '', '', '2020-09-18 01:10:03', '2020-09-18 01:10:03', 1, 0),
(30, 'test5@test.com', '$2b$08$LbElqRLBimeC7KJXKgme8ukK9WQI0Ekp2FcnEKY33iLj7Ii7PezJe', 'test5', 1, '081234567890', '', '', '2020-09-18 01:10:09', '2020-09-18 01:10:09', 1, 0),
(31, 'test6@test.com', '$2b$08$CEx6shSF40rkV73r8vYID.TS9TRyg..hmw8KljMa5ZYu4Ijo4sJ0i', 'test6', 1, '081234567890', '', '', '2020-09-18 01:10:16', '2020-09-18 01:10:16', 1, 0),
(32, 'test7@test.com', '$2b$08$Q3rWlyA.1wQI3OzhYy0TEeuCbZstCMklIOTqms2JU1Av03U3xtEtq', 'test7', 1, '081234567890', '', '', '2020-09-18 01:10:21', '2020-09-18 01:10:21', 1, 0),
(33, 'test8@test.com', '$2b$08$h3jHecIn3Tf/Lex8SkRPn.eOSF6NNkZzQAjDd/GQicv9EniWobTDq', 'Nur Fauzan', 1, '081234567890', '', '', '2020-09-18 01:10:28', '2020-09-18 01:10:28', 1, 0),
(37, 'nurfauzangiri@gmail.com', '$2b$10$3rJiyf.gXn73kFY7GRKKguwsfoPlsA20Y9.K9pHeyTDbUUJzqdsGS', 'Giri Said Nurfauzan', 2, '081234567890', 'PT. Sukasuka', 'hrd', '2020-09-18 02:14:37', '2020-10-09 06:43:19', 1, 45565),
(38, 'nurfauzangiri2@gmail.com', '$2b$08$2OjQVfXDRiBs14g0KE6MWueO3ZaNZFZDzMzGmNIiBx1o1cFcS1buK', 'Giri', 1, '081234567890', '', '', '2020-10-08 12:21:36', '2020-10-08 12:21:37', 0, 72218),
(39, 'girisaidn@gmail.com', '$2b$08$tWvCqdIGe1kXa9NLcx2aiut0xR2cudEJ6swbe3RqNcWMJo5uc.dxq', 'Nur', 1, '081234567890', '', '', '2020-10-09 00:01:20', '2020-10-09 00:01:20', 1, 36956),
(40, 'star16@gmail.com', '$2b$08$qC0ii837nZs2rBxZybVRM.NZAOpUzdLuFZKrqv6hRgBILAmp.DGRK', 'muzmi1234', 1, '08111111112', '', '', '2020-10-09 01:39:32', '2020-10-09 01:39:32', 0, 0),
(41, 'star161@gmail.com', '$2b$08$zQTubAixagTWJ/w2D1NlwurCJqU7G6O42bNpFDGJ5Ny90KxLLM9AS', 'muzmi1234', 1, '08111111112', '', '', '2020-10-09 01:46:39', '2020-10-09 01:46:39', 0, 0),
(42, 'star162@gmail.com', '$2b$08$EVLqi6cTMazH73rPWLaCMeqBgxuvtZgopGEDzzXS5oWvn5D/JtFTy', 'muzmi1234', 1, '08111111112', '', '', '2020-10-09 01:47:23', '2020-10-09 01:47:23', 0, 0),
(43, 'star163@gmail.com', '$2b$08$HBvuJigcizWuxddyiCK7cechZnqTO3TQCVzo58MyRI8NIu46HewjO', 'muzmi1234', 1, '08111111112', '', '', '2020-10-09 01:47:59', '2020-10-09 01:47:59', 0, 0),
(44, 'test9@test.com', '$2b$08$3eXdzctiWaj06Gk1PoP2OuK7/HPEXkMUVlKqwez76usYZ00nhV6ne', 'Said Nurfauzan', 1, '081234567890', '', '', '2020-10-09 02:14:41', '2020-10-09 02:14:41', 1, 54673),
(45, 'test10@test.com', '$2b$08$l7fV3XliJn3xVV32NRYuSOa7onz/gJ96e4ZqlKi/i4ZMhytV69Sge', 'Test10', 1, '081234567890', '', '', '2020-10-10 04:46:53', '2020-10-10 04:46:54', 1, 59088);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company_profile`
--
ALTER TABLE `company_profile`
  ADD PRIMARY KEY (`profile_id`);

--
-- Indexes for table `experience`
--
ALTER TABLE `experience`
  ADD PRIMARY KEY (`exp_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`msg_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notif_id`);

--
-- Indexes for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD PRIMARY KEY (`portfolio_id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`profile_id`);

--
-- Indexes for table `roomchat`
--
ALTER TABLE `roomchat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`skill_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company_profile`
--
ALTER TABLE `company_profile`
  MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `experience`
--
ALTER TABLE `experience`
  MODIFY `exp_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `msg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `notif_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `portfolio`
--
ALTER TABLE `portfolio`
  MODIFY `portfolio_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `profile_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `roomchat`
--
ALTER TABLE `roomchat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `skill`
--
ALTER TABLE `skill`
  MODIFY `skill_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
