// server/app.js
require('dotenv').config(); // 【新增】加载环境变量

const express = require('express');
const cors = require('cors');
const KnowledgeModel = require('./db'); // 引入数据模型


const app = express();
// 【修改】优先使用环境变量中的端口，本地开发时回退到 3000
const PORT = process.env.PORT || 3000; 

// 允许跨域请求
app.use(cors());
// 解析 JSON 格式的请求体
app.use(express.json()); 

// 1. 模拟获取国学诗词数据的接口
app.get('/api/poems', (req, res) => {
    const poems = [
        { title: '静夜思', dynasty: '唐', author: '李白', category: '唐诗', content: ['床前明月光，','疑是地上霜。','举头望明月，','低头思故乡。'] },
        { title: '水调歌头', dynasty: '宋', author: '苏轼', category: '宋词', content: ['明月几时有？','把酒问青天。','不知天上宫阙，','今夕是何年。'] }
    ];
    res.json({ code: 200, data: poems });
});

// 2. 模拟接收健康打卡数据的接口
app.post('/api/health', (req, res) => {
    console.log('收到前端提交的健康数据:', req.body);
    // 实际开发中，这里会把 req.body 存入数据库
    res.json({ code: 200, message: '打卡成功！' });
});

// 接收并保存到 MongoDB
app.post('/api/knowledge/save', async (req, res) => {
    try {
        const knowledgeData = req.body;
        
        // 使用 Mongoose 将数据存入数据库
        const newKnowledge = new KnowledgeModel(knowledgeData);
        await newKnowledge.save();
        
        console.log('📥 成功归档一篇中医知识:', knowledgeData.title);
        res.json({ code: 200, message: '知识已安全存入数据库！' });
    } catch (error) {
        console.error('保存失败:', error);
        res.status(500).json({ code: 500, message: '服务器内部错误' });
    }
});

// 获取所有中医知识列表
app.get('/api/knowledge/list', async (req, res) => {
    try {
        const list = await KnowledgeModel.find().sort({ timestamp: -1 }); // 按时间倒序排列
        res.json({ code: 200, data: list });
    } catch (error) {
        res.status(500).json({ code: 500, message: '获取列表失败' });
    }
});

// app.listen(PORT, () => {
//     console.log(`🚀 Node.js 后端已启动，监听端口: http://localhost:${PORT}`);
// });

// 【修改】优先使用环境变量中的端口，本地开发时回退到 3000
const PORT = process.env.PORT || 3000; 