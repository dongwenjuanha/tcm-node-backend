// server/db.js
const mongoose = require('mongoose');

// 连接到本地 MongoDB（默认端口 27017），数据库名为 tcm_db
const dbUrl = 'mongodb://localhost:27017/tcm_db'; 

mongoose.connect(dbUrl)
  .then(() => console.log('✅ MongoDB 数据库连接成功'))
  .catch(err => console.error('❌ 数据库连接失败:', err));

// 定义中医知识的 Schema（数据结构骨架）
const knowledgeSchema = new mongoose.Schema({
  title: String,
  coreSummary: String,
  stages: Array, // 直接支持存储复杂的数组结构
  conclusion: String,
  timestamp: { type: Date, default: Date.now }
});

// 创建 Model（对应数据库中的一张集合/表）
const KnowledgeModel = mongoose.model('Knowledge', knowledgeSchema);

module.exports = KnowledgeModel;