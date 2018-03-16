/*
Navicat MySQL Data Transfer

Source Server         : tan
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : reactblock

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-03-16 11:09:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(10000) DEFAULT NULL,
  `fid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('1', 'sdf', 'sadfsf', '0');
INSERT INTO `article` VALUES ('2', 'sdf', 'sadfsf', '0');
INSERT INTO `article` VALUES ('3', null, null, '0');
INSERT INTO `article` VALUES ('5', null, null, '0');
INSERT INTO `article` VALUES ('6', null, null, '0');
INSERT INTO `article` VALUES ('23', '士大夫将会尽快还款计划11111', '&lt;p&gt;i阿里山扩大和飞机螺丝钉和刻录机阿富汗&lt;/p&gt;', '2');
INSERT INTO `article` VALUES ('24', '士大夫将会尽快还款计划111111111111', '&lt;p&gt;i阿里山扩大和飞机螺丝钉和刻录机阿富汗&lt;/p&gt;', '3');

-- ----------------------------
-- Table structure for classify
-- ----------------------------
DROP TABLE IF EXISTS `classify`;
CREATE TABLE `classify` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fenlei_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of classify
-- ----------------------------
INSERT INTO `classify` VALUES ('1', 'react');
INSERT INTO `classify` VALUES ('2', 'bootstrap');
INSERT INTO `classify` VALUES ('3', 'javascript');
INSERT INTO `classify` VALUES ('4', 'JQuery');
INSERT INTO `classify` VALUES ('5', 'Swiper');
INSERT INTO `classify` VALUES ('6', 'webpack');
INSERT INTO `classify` VALUES ('7', 'PHP');
