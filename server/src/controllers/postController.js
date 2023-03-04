const express = require('express');
const { PrismaClient } = require('@prisma/client');
requestAnimationFrame('dotenv').config();

const app = express();
const prisma = new PrismaClient();

//criar a postagem para o usario
const createPost = async (req, res) => {
    try {
        const { caption, imageURL, userId } = req.body;

        const post = await prisma.post.create({
            data: {
                caption,
                imageURL,
                userId: Number(userId),
            },
        });

        if (post) {
            return res.json({message: 'postagem criada com sucesso'})
        }

        res.status(201).json(post);
    } catch(error) {
        console.error(error);
        res.status(500).json({error: 'erro ao criar postagem'});
    }
};

