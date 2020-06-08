


class Book {
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
};









// database Dengan Local Storage
class dataBase{
    static getData(){
        let books;
        if( localStorage.getItem('books') === null ){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addData(book){
        let books = dataBase.getData();
        books.push(book);
        localStorage.setItem( 'books',JSON.stringify(books) );
    }

    static removeData(isbn){
        let books = dataBase.getData();
        books.forEach(function(key, index){
            if(key.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books) );
    }
}








class UI {
    static displayBooks(){
        const StoredBooks = dataBase.getData();
            StoredBooks.forEach(function(e){
                UI.addNewBook(e);
            });
    };

                    static addNewBook(e){
                        const list = document.querySelector('#book-list');
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${e.title}</td>
                            <td>${e.author}</td>
                            <td>${e.isbn}</td>
                            <td><a href='#' class='btn btn-danger'>x</a></td>            
                        `;
                        list.appendChild(row);
                    };

    static clearFields(){
        const title = document.querySelector('#title');
        const author = document.querySelector('#author');
        const isbn = document.querySelector('#isbn');
        title.value = '';author.value = '';isbn.value = '';        
    };

                    static showAlert(message , className){
                        const form = document.querySelector('.container');
                        const beforThis = document.querySelector('#book-form');
                        
                        const div = document.createElement('div');
                        div.className = className;
                        div.appendChild(document.createTextNode(message));
                        
                                form.insertBefore(div,beforThis);
                                setTimeout(function(){
                                    div.remove();
                                },3000)
                    };
};







// Tampilkan semua buku ketika document di load
document.addEventListener('DOMContentLoaded',UI.displayBooks);





// Tambah data
document.querySelector('#book-form').addEventListener('submit',function(e){
        e.preventDefault;
        
        const title = document.querySelector('#title');
        const author = document.querySelector('#author');
        const isbn = document.querySelector('#isbn');
            if( title.value === '' || author.value === '' || isbn.value === '' ){
                UI.showAlert('Data tidak boleh kosong!', 'alert-danger')
                return
            }
        const newBook = new Book(title.value,author.value,isbn.value);
        dataBase.addData(newBook);
        UI.addNewBook(newBook);
        UI.clearFields();
    });





// Hapus data
document.querySelector('#book-list').addEventListener('click',function(e){
    if(e.target.tagName == 'A'){
        if(confirm('Hapus data ini') ){            
            let isbn  = e.target.parentElement.previousElementSibling.textContent;
            e.preventDefault();
            
            dataBase.removeData(isbn);
            e.target.parentElement.parentElement.remove();
            UI.showAlert('Berhasil menghapus data','alert-success');
        }
    }
});





