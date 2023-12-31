CREATE DATABASE  IF NOT EXISTS `aclc` ;
USE `aclc`;

-- tables names: classes, teachers, students, courseclasscontact, courses, grades, secretary, schedule, assignments
-- drop table assignments;
-- drop table schedule;
-- drop table secretary;
-- drop table grades;
-- drop table courses;
-- drop table courseclasscontact;
-- drop table students;
-- drop table teachers;
-- drop table classes;


-- --
-- Table structure for table `classes`
--
CREATE TABLE IF NOT EXISTS `classes` (
  `classId` int NOT NULL,
  `className` varchar(255) DEFAULT NULL,
  `passingAvarage` int DEFAULT NULL
) ;

--
-- Table structure for table `teachers`
--

CREATE TABLE IF NOT EXISTS `teachers` (
  `id` int NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `password` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;

--
-- Table structure for table `students`
--
CREATE TABLE IF NOT EXISTS `students` (
  `id` int NOT NULL,
  `firstName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `lastName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `studentClass` int DEFAULT NULL,
  `password` int DEFAULT NULL,
  `url` nvarchar(255),
  PRIMARY KEY (`id`)
);

--
-- Table structure for table `courseclasscontact`
--
CREATE TABLE IF NOT EXISTS `courseclasscontact` (
  `classId` int not NULL,
  `courseId` int not NULL,
  primary key (classId, courseId)
) ;


--
-- Table structure for table `courses`
--
CREATE TABLE IF NOT EXISTS `courses` (
  `courseId` int auto_increment ,
  `teacherId` int DEFAULT NULL,
  `passingGrade` int DEFAULT NULL,
  `courseName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`courseId`),
  KEY `teacherId` (`teacherId`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `teachers` (`id`)
) ;
--

--
-- Table structure for table `grades`
--
CREATE TABLE IF NOT EXISTS `grades` (
  `courseId` int NOT NULL,
  `studentId` int NOT NULL,
  `grade` int DEFAULT NULL,
  PRIMARY KEY (`studentId`,`courseId`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `grades_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`),
  CONSTRAINT `grades_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `courses` (`courseId`)
);

--
-- Table structure for table `secretary`
--
CREATE TABLE IF NOT EXISTS `secretary` (
  `id` int not NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255)DEFAULT NULL,
  `password` int DEFAULT NULL
);

--
-- Table structure for table `schedule`
--
CREATE TABLE IF NOT EXISTS schedule(
id nvarchar(255),
studentId int,
data longtext,
primary key (`id`),
FOREIGN KEY (`studentId`) REFERENCES `students` (`id`));


--
-- Table structure for table `assignments`
--
CREATE TABLE IF NOT EXISTS `assignments` (
`id` INT AUTO_INCREMENT,
`studentId` int NOT NULL,
`courseId` int NOT NULL,
`taskNumber` int NOT NULL,
`date` DATETIME NOT NULL,
`url` varchar(255)  NULL,
primary key (`id`),
FOREIGN KEY (`studentId`) REFERENCES `students` (`id`),
FOREIGN KEY (`courseId`) REFERENCES `courses` (`courseId`));

--
-- Dumping data for table `classes`
--  ;
INSERT INTO `classes` VALUES (1,'software_engineering',60),(2,'graphic_design',75);

--
-- Dumping data for table `teachers`
--
INSERT INTO `teachers` VALUES (1,'Rachel','Levi',111),(22,'Naama','Kastel',852),(44,'Shoshi','Koplowitch',678),(111,'Simcha','Kaner',8585);

--
-- Dumping data for table `students`
--
INSERT INTO `students` VALUES (4,'Ahuva','Fieg',1,4,'das'),(55,'Tzipora','Grin',1,123,'df'),(222,'Malka','Cohen',1,456,'aert'),(555,'Mira','Nusboim',2,789,'et'),(214127391,'Chaya','Lipshitz',1,7391,'ad');

--
-- Dumping data for table `courseclasscontact`
--
INSERT INTO `courseclasscontact` VALUES (1,1), (2,2), (4,4), (6,6), (3,3);

-- Dumping data for table `courses`
--
INSERT INTO `courses` VALUES (1,1,60,'Infi'),(2,22,60,'C++'),(3,22,60,'full_stack'),(4,22,60,'video'),(6,111,60,'afterEffects');

--
-- Dumping data for table `grades`
--
INSERT INTO `grades` VALUES (1,4,50),(2,4,1020),(3,4,98),(2,55,50),(3,55,82),(2,222,99),(1,214127391,99),(2,214127391,100);

--
-- Dumping data for table `secretary`
--
INSERT INTO `secretary` VALUES (88888,'Tamar','Levi',789),(4444,'Tzivia','Twerski',123) ;
--
-- Dumping data for table `schedule`
--
INSERT INTO `schedule` VALUES('1', 4,"fff");
