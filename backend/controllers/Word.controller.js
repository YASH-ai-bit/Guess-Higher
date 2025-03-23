import Word from "../models/Word.model.js"
import mongoose from "mongoose"

export const getWord = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "no such word"})
    }

    const word = await Word.findById(id)

    if(!word){
        return res.status(404).json({error: "no such word"})
    }

    res.status(200).json(word)
}   