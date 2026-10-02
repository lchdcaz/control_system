/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.6-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: task_manager
-- ------------------------------------------------------
-- Server version	11.8.6-MariaDB-0+deb13u1 from Debian

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(50) NOT NULL,
  `subtitle` varchar(100) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES
(1,7,'123','123','pending','2026-09-27 12:09:58',NULL),
(2,7,'test','test','done','2026-09-27 12:10:06',NULL),
(3,7,'1','1','pending','2026-09-27 12:10:09',NULL),
(4,7,'1','1','pending','2026-09-27 12:10:12','2026-09-27 12:10:28'),
(5,7,'1','1','done','2026-09-27 12:10:14',NULL),
(6,7,'user_del','111','pending','2026-09-27 12:18:30','2026-09-27 12:18:35'),
(7,7,'user_done','11','done','2026-09-27 12:18:46',NULL),
(8,7,'user_pending','11','pending','2026-09-27 12:38:47',NULL),
(9,7,'12','12','pending','2026-09-28 04:06:05',NULL),
(10,7,'12','12','pending','2026-09-28 04:06:08',NULL),
(11,7,'12','12','pending','2026-09-28 04:06:10',NULL),
(12,7,'12','12','pending','2026-09-28 04:06:13',NULL),
(13,7,'12','12','pending','2026-09-28 04:06:16',NULL),
(14,7,'12','12','pending','2026-09-28 04:06:18',NULL),
(15,7,'12','12','pending','2026-09-28 04:06:22',NULL),
(16,7,'21','12','pending','2026-09-28 04:06:49',NULL),
(17,7,'12','12','pending','2026-09-28 04:06:52',NULL),
(18,7,'12','3124','pending','2026-09-28 04:07:01',NULL),
(19,7,'213','123','pending','2026-09-28 04:07:05',NULL),
(20,7,'12312','123131','pending','2026-09-28 04:07:15',NULL),
(21,7,'213','213','pending','2026-09-28 04:07:31',NULL),
(22,7,'123','123','pending','2026-09-28 04:07:34',NULL),
(23,7,'123','123','pending','2026-09-28 04:07:36',NULL),
(24,7,'123','123','pending','2026-09-28 04:07:39',NULL),
(25,7,'2332','2323','pending','2026-09-28 04:07:42',NULL),
(26,7,'232','323','pending','2026-09-28 04:07:45',NULL),
(27,7,'23232','2323','pending','2026-09-28 04:07:48',NULL),
(28,7,'2323','2323','pending','2026-09-28 04:07:51','2026-09-28 04:26:20'),
(29,7,'231231','123131','done','2026-09-28 04:07:54',NULL),
(30,7,'1231','213213','done','2026-09-28 04:07:57',NULL),
(31,7,'12','12','pending','2026-09-30 06:46:40',NULL);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(7,'11','$2b$10$GCf8FvKlimdh//5n7SicXeRCCHNIDeCU7EUD6z0J8pLnlgIIvzmse','2026-09-11 19:52:30'),
(8,'lic10769@gmail.com','$2b$10$Na4PDd2tD6xB53x98f0wW.W2iZFX9cKbW6t4mqwo8/giWs7yHNprS','2026-09-11 21:34:40'),
(9,'123','$2b$10$2IJVc348TLIka/gFLUjwSOYao7cEjM6uqgD4vHpfrVAJsq9foPLhq','2026-09-17 20:24:18'),
(10,'12345','$2b$10$KCXi7qzU45ZlF0IOJFkUh.TcdCUD5.sXic0xyskGRO8Au2a0IjUFm','2026-09-21 04:00:23'),
(11,'lli','$2b$10$SxjyPSJbHS52QJ7XE2kS5OmJ/nfe4rztKi7JezUxPfDIo6MRlkohG','2026-09-21 04:00:38'),
(13,'test','$2b$10$k310TlqT7J.OrgkSQ1ymb.d5XNkk1tCTG6uIPrEMbD9ZL3NHG47GK','2026-09-21 04:03:35'),
(14,'test1','$2b$10$9DEA.5afGFQvoT1NZUYuo.BIMaY/87ZOPX3fdWivxLzSLtWmQdmVy','2026-09-21 04:05:01'),
(15,'test123','$2b$10$kqtSrHSX6Fcdg0XiCmDcG.MR5xFz3YllFSjeNwKRE1WkW.iTAGqJe','2026-09-21 04:05:15'),
(17,'test_100','$2b$10$p1E7yZEpfsI4z/I2Nx6FXeIVPyZXoQHOY/x/LN9sqlzW6MXdJ2Xru','2026-09-21 04:08:26'),
(18,'test_200','$2b$10$2H1b6l/8J99pOhSstg0LrepGoVGg1WHPa8gT/.HjfT5xFku9zywqq','2026-09-21 04:09:21'),
(20,'test_2123','$2b$10$ptGVF0FP2R/gOZ278SMBy.Fc46tC/ZgF1SKGzwHUDbvNVeCUlxmPG','2026-09-21 04:09:48'),
(21,'usertext','$2b$10$/B6vCj1GO8jTfGvowvQOQukyxe4LlqUk4hyJ54ykCUgVXc64Gm/SG','2026-09-21 04:10:40'),
(22,'callda','$2b$10$It8sCuQuuxphRE2Ez8pqueoz4wjN.t5wOqrNxskxaGrxCFkoPsGNa','2026-09-21 04:12:47'),
(23,'callda123','$2b$10$Yy6A6KMUVVyJL4FrT1vWnO5Ulb/zBocCdG3/1ZUjn38zO/YzajD1e','2026-09-21 04:13:25'),
(25,'callda1234','$2b$10$U0eIUuXENlmtJCFO2VaPjuoSNETwlRG.FCLBIDk3OJaXnSgM/x.KO','2026-09-21 04:14:18'),
(26,'ooo111','$2b$10$0609mr59s33vyviQdcPW/.iSeGpZdMFkaSpVkd7QlqSsnnsypgPDe','2026-09-21 04:16:10'),
(27,'ooo1111','$2b$10$Gzm1MOY9rs7eA3MHLOhlFOPr/fhwC.NgyQDNUioxXKLFkU5UiDs22','2026-09-21 04:19:04'),
(28,'ooo11113','$2b$10$iOxEuqh4m2sglGxYREKAYelbkA9YOFMtzAl8Z.R2kMKkzseZ90qC.','2026-09-21 04:23:09'),
(29,'121','$2b$10$IasYzM3Gk3exIMtSI4LGvupjD8OYe73TSGJoPoUJ.7DNZSmajCYAK','2026-09-21 04:24:01'),
(30,'12313','$2b$10$OxIOS1ghCko6q36CKxMxRe0WMbKKZpbngHshiwaiP5wcRTKaKYv8y','2026-09-21 04:25:03'),
(31,'123455','$2b$10$M3k6haCckVuihrN6oooN9OSGoP8Jgs7EgmOnJwEnLwr1lu/1ux9SO','2026-09-21 04:26:38'),
(32,'44123','$2b$10$2YCIFdBwI/FVZtPtHCLgKeDeZJPDidPxjVYBiEhXVsE7h/RwxRqk2','2026-09-21 04:28:44'),
(33,'124791352','$2b$10$pYkKiU8jdASmsr3qEQ3jveT9cveSnxcU2DDZMUF0FXl58PkkLlNfS','2026-09-21 04:29:31'),
(34,'snlsns','$2b$10$ftC5zIFUqT8hAjHNB/mGTOIu4F/6K0fX6eVKSIn9b9PV40WjzyPym','2026-09-21 04:31:12'),
(35,'sdfsdfsl','$2b$10$iJWBTuypsiLl737QM/hp1OSW1FwaQ9RFcmFWRtEVMh3K0nV08Trge','2026-09-21 04:32:07'),
(36,'113','$2b$10$97oDCazW5llr.rPW9MVPRO9uRbXA3Eh3fly2a32aX8Q8bYDQQ/eJi','2026-09-27 09:23:43');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-09-30 16:12:46
