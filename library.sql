-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: library
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `bookId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `quantity` int NOT NULL,
  `author` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `publishingYear` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `kind` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `NXB` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `id` int NOT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  PRIMARY KEY (`bookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES ('BOrNsyxJ_','Tôi là Bêtô',0,'Nguyễn Nhật Ánh','2010','Tiểu Thuyết','Hàng 5 Cột 2','Nhà Xuất Bản Văn Học',1,'còn'),('cBjDBvSVe','Cô gái đến từ hôm qua',0,'Nguyễn Nhật Ánh','2016','Tiểu Thuyết','Hàng 3 Cột 4','Nhà Xuất Bản Hà Nội',2,'đã mượn'),('dfkz8Exbe','Tuổi thơ dữ dội',0,'Phùng Quán','2016','Tiểu Thuyết','Hàng 3 Cột 7','Nhà Xuất Bản Văn Học',3,'đã mượn'),('DK6Bjettk','Chuyện thảo nguyên',0,'Lại Văn Sinh','2016','Tiểu Thuyết','Hàng 3 Cột 4','Nhà Xuất Bản Hà Nội',4,'đã mượn'),('i85wS8C4E','Giải Tích 1',0,'Nguyễn Xuân Thảo','2010','Khoa Học Tự Nhiên','Hàng 3 Cột 2','Nhà Xuất Bản Bách Khoa',5,'đã mượn'),('PlIw9NLLg','Đại Số',0,'Nguyễn Xuân Thảo','2009','Khoa Học Tự Nhiên','Hàng 4 Cột 2','Nhà Xuất Bản Bách Khoa',6,'đã mượn'),('pR2S-Cx59','Dế mèn phiêu lưu ký',1,'Tô Hoài','2008','Tiểu Thuyết','Hàng 1 Cột 4','Nhà Xuất Bản Văn Học',7,'còn'),('q2KbBjR46','Đất rừng phương Nam',0,'Đoàn Giỏi','2005','Tiểu Thuyết','Hàng 5 Cột 1','Nhà Xuất Bản Văn Học',8,'đã mượn'),('QqfPbQqKn','Đắc nhân tâm',0,'Dale Carnegie','1990','Kĩ năng sống','Hàng 1 Cột 4','Nhà Xuất Bản Hà Nội',13,'đã mượn'),('xwdOAKtOo','Tôi thấy hoa vàng trên cỏ xanh',0,'Nguyễn Nhật Ánh','2017','Tiểu Thuyết','Hàng 3 Cột 5','Nhà Xuất Bản Hà Nội',9,'đã mượn');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrowing`
--

DROP TABLE IF EXISTS `borrowing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrowing` (
  `bookId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `readerId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `ngayMuon` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `ngayTra` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `borrowId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  PRIMARY KEY (`borrowId`),
  KEY `bookId` (`bookId`),
  KEY `readerId` (`readerId`),
  CONSTRAINT `borrowing_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `books` (`bookId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `borrowing_ibfk_2` FOREIGN KEY (`readerId`) REFERENCES `readers` (`readerId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrowing`
--

LOCK TABLES `borrowing` WRITE;
/*!40000 ALTER TABLE `borrowing` DISABLE KEYS */;
INSERT INTO `borrowing` VALUES ('q2KbBjR46','xXHoQarT-','17/05/2020','01/07/2020','2cZh0MSSV'),('cBjDBvSVe','rF6VV-ggw','18/05/2020','02/07/2020','B0VBQrAYp'),('DK6Bjettk','0PJB9Xl_D','18/05/2020','02/07/2020','BrFLdjBLp'),('dfkz8Exbe','rF6VV-ggw','18/05/2020','02/07/2020','HhUZrn-sh'),('xwdOAKtOo','V3NxeKUv9','18/05/2020','02/07/2020','JuqS9qMCj'),('PlIw9NLLg','rvN64dP-x','18/05/2020','02/07/2020','VnGFZoNV6'),('i85wS8C4E','rvN64dP-x','18/05/2020','02/07/2020','wIm_Bz9dW'),('QqfPbQqKn','xXHoQarT-','17/05/2020','01/07/2020','Xsjpem4kf');
/*!40000 ALTER TABLE `borrowing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cost`
--

DROP TABLE IF EXISTS `cost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cost` (
  `idCost` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `readerId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `cost` int DEFAULT NULL,
  `dateAdd` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`idCost`),
  KEY `cost_fk1_idx` (`readerId`),
  CONSTRAINT `cost_fk1` FOREIGN KEY (`readerId`) REFERENCES `readers` (`readerId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cost`
--

LOCK TABLES `cost` WRITE;
/*!40000 ALTER TABLE `cost` DISABLE KEYS */;
INSERT INTO `cost` VALUES ('1Ih4xf6br','rF6VV-ggw',200000,'04/04/2020'),('723SVmCtU','V3NxeKUv9',200000,'04/03/2020'),('aMdtg1Mu7','xXHoQarT-',200000,'04/04/2020'),('EvQxoa5HB','rF6VV-ggw',200000,'04/04/2020'),('HHnOZ0mLx','6Y8Ixy3S1',200000,'04/05/2020'),('wXoSX0J8M','V3NxeKUv9',200000,'04/06/2020'),('zoURFKTOX','V3NxeKUv9',200000,'04/06/2020');
/*!40000 ALTER TABLE `cost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `readers`
--

DROP TABLE IF EXISTS `readers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `readers` (
  `readerId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `nameUser` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `dateOfBirth` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `gender` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `phone` int NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `userId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `ngayTao` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `ngayHetHan` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  PRIMARY KEY (`readerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `readers`
--

LOCK TABLES `readers` WRITE;
/*!40000 ALTER TABLE `readers` DISABLE KEYS */;
INSERT INTO `readers` VALUES ('0PJB9Xl_D','d9710449e368a369f129a18c0749cf7e','Nguyễn Văn B','1992-06-09','Nam',927163611,'nguyenvanB@gmail.com','hà nội','3','12/05/2020','05/12/2020'),('11111111','21232f297a57a5a743894a0e4a801fc3','admin','1000-02-01','Nam',98736212,'admin123@gmail.com','hà nội','1','00/00/0000','00/00/2900'),('6Y8Ixy3S1','a9186a153bf0caaebfb72b49aaaf082f','Trịnh Văn D','2000-01-01','Nam',92712565,'trinhvanD@gmail.com','Hà Nội','3','12/05/2020','30/5/2020'),('Hrtyew_UV','f999dc86f867e988f2e30565e190d2a1','Đào Viết F','1998-10-01','Nam',92813611,'daovietF@gmail.com','Hà Nội','3','12/05/2020','03/01/2020'),('rF6VV-ggw','d9710449e368a369f129a18c0749cf7e','Nguyễn Văn A','1990-01-01','Nam',92812633,'nguyenA@gmail.com','Hà Nội','3','12/05/2020','31/6/2020'),('rvN64dP-x','d9710449e368a369f129a18c0749cf7e','Nguyễn Tiến D','1993-02-01','Nam',972135121,'nguyentienD@gmail.com','Hà nội','3','12/05/2020','28/09/2020'),('sO8ZH4Laz','d9710449e368a369f129a18c0749cf7e','KhoaLib','1111-11-11','Nam',92371313,'nguyenvanB@gmail.com','Hà nội','2','14/05/2020','00/00/2900'),('V3NxeKUv9','d9710449e368a369f129a18c0749cf7e','Nguyễn Thị C','1994-01-08','Nữ',982361631,'nguyenthiC@gmail.com','Thành Phố HCM','3','12/05/2020','02/1/2021'),('xXHoQarT-','d9710449e368a369f129a18c0749cf7e','Khoa','1111-01-01','Nam',912381631,'thekhoa22313@gmail.com','Hà nội','3','12/05/2020','06/6/2020'),('y-2zA4j0Y','d9710449e368a369f129a18c0749cf7e','Tom','1990-02-09','Nữ',98127351,'nguyentienD@gmail.com','Hà Nội','2','14/05/2020','05/01/2099');
/*!40000 ALTER TABLE `readers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `returning`
--

DROP TABLE IF EXISTS `returning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `returning` (
  `returnId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `bookId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `readerId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `dateReturn` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  PRIMARY KEY (`returnId`),
  KEY `bookId` (`bookId`),
  KEY `readerId` (`readerId`),
  CONSTRAINT `returning_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `books` (`bookId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `returning_ibfk_2` FOREIGN KEY (`readerId`) REFERENCES `readers` (`readerId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `returning`
--

LOCK TABLES `returning` WRITE;
/*!40000 ALTER TABLE `returning` DISABLE KEYS */;
INSERT INTO `returning` VALUES ('1a1rkc4hY','cBjDBvSVe','rF6VV-ggw','15/05/2020'),('6PSBvqC_Q','dfkz8Exbe','rvN64dP-x','17/05/2020'),('6zYifkudN','pR2S-Cx59','rvN64dP-x','16/05/2020'),('90SaQrLca','xwdOAKtOo','xXHoQarT-','17/05/2020'),('akZPtCr6A','cBjDBvSVe','V3NxeKUv9','17/05/2020'),('aYuFNh245','PlIw9NLLg','V3NxeKUv9','15/05/2020'),('BzWo3HCN3','DK6Bjettk','rvN64dP-x','17/05/2020'),('d5RHvD7mf','dfkz8Exbe','xXHoQarT-','17/05/2020'),('egR1Q4uZ3','DK6Bjettk','xXHoQarT-','17/05/2020'),('jA0a5BcOO','PlIw9NLLg','xXHoQarT-','17/05/2020'),('lYfmwG4lx','DK6Bjettk','rvN64dP-x','15/05/2020'),('R_QH32j8y','pR2S-Cx59','V3NxeKUv9','04/06/2020'),('tPCr7jQmN','BOrNsyxJ_','0PJB9Xl_D','18/05/2020'),('VIHS6lTN5','DK6Bjettk','xXHoQarT-','17/05/2020'),('Y1MZPPhK5','dfkz8Exbe','xXHoQarT-','17/05/2020'),('ZLBC13DCM','xwdOAKtOo','xXHoQarT-','17/05/2020');
/*!40000 ALTER TABLE `returning` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `time`
--

DROP TABLE IF EXISTS `time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `time` (
  `idtime` varchar(45) NOT NULL,
  `readerId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `timeIn` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`idtime`),
  KEY `time_fk_1_idx` (`readerId`),
  CONSTRAINT `time_fk_1` FOREIGN KEY (`readerId`) REFERENCES `readers` (`readerId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time`
--

LOCK TABLES `time` WRITE;
/*!40000 ALTER TABLE `time` DISABLE KEYS */;
INSERT INTO `time` VALUES ('1gAQwBHjW','rF6VV-ggw','2020-06-04 23:23:08.648'),('9NStkcU9h','xXHoQarT-','2020-06-04 23:22:24.028'),('PUw7VB6dW','V3NxeKUv9','2020-06-04 23:22:45.978'),('tB_jPLLE7','xXHoQarT-','2020-06-05 00:09:28.946'),('XOvessfEq','0PJB9Xl_D','2020-06-04 23:23:19.401');
/*!40000 ALTER TABLE `time` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-05  0:15:37
