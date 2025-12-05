CREATE DATABASE  IF NOT EXISTS `projeto-integrador` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `projeto-integrador`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: projeto-integrador
-- ------------------------------------------------------
-- Server version	9.4.0

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
-- Table structure for table `entrada_estoque`
--

DROP TABLE IF EXISTS `entrada_estoque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entrada_estoque` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome_produto` varchar(50) NOT NULL,
  `quantidade` int NOT NULL,
  `data_entrada` date NOT NULL,
  `setor` varchar(50) NOT NULL,
  `observacao` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entrada_estoque`
--

LOCK TABLES `entrada_estoque` WRITE;
/*!40000 ALTER TABLE `entrada_estoque` DISABLE KEYS */;
INSERT INTO `entrada_estoque` VALUES (1,'Placa de Vídeo RTX 4060',12,'2025-11-10','Hardware','Lote de alto valor, armazenar na sala refrigerada.'),(2,'Fusível Térmico 10A',500,'2025-11-09','Manutencao','Peça de reposição padrão para equipamentos antigos.'),(3,'Sensor de Presença Infra',45,'2025-11-10','Seguranca','Objeto para instalação em novos escritórios.'),(4,'Display OLED 3.2 polegadas',150,'2025-11-11','Prototipos','Componente eletrônico para desenvolvimento de novos produtos.'),(5,'Parafuso M8 Aço Inox',2000,'2025-11-12','Pecas-Gerais','Material de fixação a granel. Conferir peso.'),(6,'Memória RAM DDR5 16GB',30,'2025-11-13','Hardware','Novo lote de alta frequência.'),(7,'Alicate de Corte Diagonal',40,'2025-11-13','Manutencao','Ferramenta de uso geral, caixa lacrada.'),(8,'Caderno Espiral A4',80,'2025-11-14','Escritorio','Cores sortidas. Conferir nota fiscal.'),(9,'Cabo HDMI 2.1 (3 metros)',65,'2025-11-14','Eletro-01','Para uso em monitores 4K.'),(10,'Ventoinha de Resfriamento 120mm',150,'2025-11-15','Hardware','Peça para montagem de servidor.'),(11,'chave',5,'2025-11-26','manutencao','teste'),(12,'Chave allen',1,'2025-11-26','Manutenção','Usada para conserto de cadeiras na recepção'),(13,'Folha de papel A4',100,'2025-11-26','RH','teste com data'),(14,'martelo',1,'2025-11-26','montagem','martelo quebrado'),(15,'Chave allen',1,'2025-11-27','Manutenção',''),(16,'Chave allen',1,'2025-11-27','Manutenção','');
/*!40000 ALTER TABLE `entrada_estoque` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `usuario` varchar(50) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

ALTER TABLE login ADD UNIQUE (usuario);

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('almoxarifado','almoxarifado123',1),('manutencao','manutencao123',2),('rh','rh123',3),('gerente','gerente123',4);
/*!40000 ALTER TABLE `login` ENABLE KEYS */;

UPDATE login 
SET senha = '$2b$12$dMmsKmoZJPRpopzJKOj2Ru8XeDDce/v89VIyChfT3cOq78CxuXcbq'
WHERE usuario = 'almoxarifado';

UPDATE login 
SET senha = '$2b$12$Y8AN3W4zoozzN2xe8tRuwODnzkWOzmrgn/r7IlMA2bPiT0hsGczrS'
WHERE usuario = 'manutencao';

UPDATE login 
SET senha = '$2b$12$Xd33r4LgvPQLCjH/evugaO38jmvhsHWiEr000G.4HwtbP3YG0.mwS'
WHERE usuario = 'rh';

UPDATE login 
SET senha = '$2b$12$EeQSKb64uM8ivurb6/UP6eXJRgN6AlqzvekS.C.jAkQnmKXJurXLy'
WHERE usuario = 'gerente';

UNLOCK TABLES;

--
-- Table structure for table `manutencao`
--

DROP TABLE IF EXISTS `manutencao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manutencao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item` varchar(50) NOT NULL,
  `tempo_manutencao` int NOT NULL,
  `data_manutencao` date NOT NULL,
  `setor` varchar(50) NOT NULL,
  `observacao` varchar(250) DEFAULT NULL,
  `responsavel` varchar(50) NOT NULL,
  `tipo` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manutencao`
--

LOCK TABLES `manutencao` WRITE;
/*!40000 ALTER TABLE `manutencao` DISABLE KEYS */;
INSERT INTO `manutencao` VALUES (1,'Servidor Principal',90,'2025-11-10','Hardware','Substituição de módulos de memória RAM.','Carlos Eduardo','Preventiva'),(2,'Impressora Laser B',45,'2025-11-10','Escritorio','Troca de fusor e limpeza interna.','Ana Paula','Corretiva'),(3,'Estação de Trabalho 15',20,'2025-11-11','Hardware','Otimização de sistema operacional e drivers.','Felipe Silva','Preditiva'),(4,'Máquina de Corte CNC',180,'2025-11-12','Producao','Calibração dos eixos X e Y. Manutenção preventiva.','Mariana Torres','Preditiva'),(5,'Ar Condicionado Sala A',60,'2025-11-12','Infraestrutura','Limpeza e recarga de gás refrigerante.','Carlos Eduardo','Preventiva'),(6,'teste',105,'2025-11-12','Almoxarifado','concerto','João Victor','Preventiva'),(7,'Mesa',105,'2025-12-03','RH','concerto','João','preventiva'),(8,'Cadeira',105,'2025-12-03','RH','','João','Preventiva'),(9,'Cadeira',105,'2025-12-03','RH','','João','Preventiva');
/*!40000 ALTER TABLE `manutencao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nova_solicitacao`
--

DROP TABLE IF EXISTS `nova_solicitacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nova_solicitacao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item` varchar(50) NOT NULL,
  `responsavel` varchar(50) NOT NULL,
  `data_solicitacao` date NOT NULL,
  `setor` varchar(50) NOT NULL,
  `observacao` varchar(250) DEFAULT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nova_solicitacao`
--

LOCK TABLES `nova_solicitacao` WRITE;
/*!40000 ALTER TABLE `nova_solicitacao` DISABLE KEYS */;
INSERT INTO `nova_solicitacao` VALUES (1,'Impressora Jato C','João Vítor','2025-12-01','Escritorio','Papel atolando e ruído alto.','PENDENTE'),(2,'Servidor Backup','Carlos Eduardo','2025-12-01','Hardware','Verificação de RAID e discos.','CONCLUIDA'),(3,'Câmera de Segurança Externa','Ana Paula','2025-12-02','Infraestrutura','Imagem piscando, provavelmente cabo solto.','CONCLUIDA'),(4,'Estação de Trabalho 05','Felipe Silva','2025-12-02','Hardware','Tela azul esporádica.','PENDENTE'),(6,'Impressora Jato C','João Vítor','2025-12-01','Escritorio','Papel atolando e ruído alto.','PENDENTE'),(7,'Servidor Backup','Carlos Eduardo','2025-12-01','Hardware','Verificação de RAID e discos.','CONCLUIDA'),(8,'Câmera de Segurança Externa','Ana Paula','2025-12-02','Infraestrutura','Imagem piscando, provavelmente cabo solto.','CONCLUIDA'),(9,'Estação de Trabalho 05','Felipe Silva','2025-12-02','Hardware','Tela azul esporádica.','PENDENTE');
/*!40000 ALTER TABLE `nova_solicitacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saida_estoque`
--

DROP TABLE IF EXISTS `saida_estoque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saida_estoque` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome_produto` varchar(50) NOT NULL,
  `quantidade` int NOT NULL,
  `data_saida` date NOT NULL,
  `setor` varchar(50) NOT NULL,
  `observacao` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saida_estoque`
--

LOCK TABLES `saida_estoque` WRITE;
/*!40000 ALTER TABLE `saida_estoque` DISABLE KEYS */;
INSERT INTO `saida_estoque` VALUES (1,'Memória RAM DDR5 16GB',10,'2025-11-15','Hardware','Retirada para montagem de 5 novas máquinas.'),(2,'Resma Papel A4 (500 fls)',50,'2025-11-15','Escritorio','Reposicionamento semanal para o setor administrativo.'),(3,'Parafuso M8 Aço Inox',500,'2025-11-16','Manutencao','Uso em reparo da Máquina de Corte CNC.'),(4,'Placa de Vídeo RTX 4060',2,'2025-11-16','Hardware','Substituição em estação de trabalho defeituosa.'),(5,'Toner Preto TN-234',5,'2025-11-17','Impressoras','Saída para reabastecimento das impressoras A, C, D, E e F.'),(6,'Chave allen',1,'2025-11-27','Produção',''),(7,'Chave allen',1,'2025-11-27','Produção',''),(8,'Chave allen',1,'2025-11-27','produção','');
/*!40000 ALTER TABLE `saida_estoque` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-03 22:18:20
