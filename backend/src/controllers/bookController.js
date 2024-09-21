import Book from "../models/bookModel.js"

/**
 * Createing a book object
 */
export const create = async (req, res) =>{
    try {
        const bookData = new Book(req.body);
        const {title} = bookData;

        /**Searching for the book by title */
        const bookPresent = await Book.findOne({title})

        if(bookPresent){
            return res.status(400).json({message: "Conflicting titles"});
        }else{
            const savedBook = await bookData.save();
                res.status(200).json(savedBook)
                res.send({ success: true})

        }

    } catch (error) {
        res.status(500).json({error:"Internal Server error"});
    }
};

/**
 * Get's all the books in the DB
 */
export const fetchAll = async (req, res) => {
    try{
        const books = await Book.find();

            if(books.length ===0){
                return res.status(400).json({message: "No books in the db"})
            }else{
                res.status(200).json(books);
            }
    }catch(error){
        res.status(500).json({error: "Internal Server error"})
    }
};

/**
 * Update's a book based on its Id
 */
export const update = async (req, res) =>{
    try{
        const {id, ...rest} = req.body;
        const bookPresent = await Book.findOne({_id:id})

            if(!bookPresent){
                return res.status(404).json({message:"Book not found"})
            }else{
                const updateBook = await Book.findByIdAndUpdate(id, rest,{new:true})
                res.status(201).json(updateBook);
            }
    }catch(error){
        res.status(500).json({error: "Internal Server error"})
    }
};

/** Delete's a book  */
export const deleteBook = async (req,res)=>{
    try{
        const id = req.params.id;
        const bookPresent = await Book.findOne({_id:id})

            if(!bookPresent){
                return res.status(404).json({message: "Book not found"})
            }else{
                await Book.findByIdAndDelete(id)
                res.status(201).json({message: "Book Successfully deleted"})
            }
    }catch(error){
        res.status(500).json({error: "Internal Server error"})
    }
};
