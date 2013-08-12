#Book Class
class Book
	def initialize(author, title, publisher, year)
		#Instance variables
		@author = author
		@title = title
		@publisher = publisher
		@year = year
		@shelf_num = nil
	end

	#assigns book a certain shelf
	def enshelf(picked_shelf)
		@shelf_num = picked_shelf
	end

	#takes book off the shelf
	def unshelf
		if @shelf_num == nil
			puts "Book is not on the shelf"
		else
			@shelf_num = nil
		end
	end

	#displays all the info for the book
	def display_book
		puts "Author: #@author, Title: #@title, Publisher: #@publisher, Year: #@year, Location: Shelf: #@shelf_num"
	end

end

#Shelf Class
class Shelf
	def initialize
		@books = []
	end

	#displays all the books on the shelf
	def display_shelf
		puts @books
	end

	#add book on the shelf
	def add_book(book)
		@books.push(book)	
	end
	
	#displays all the books on the shelf
	def display_shelf
		i=0
		while i < @books.length
			@books[i].display_book
			i+=1
		end
	end
	
	#returns the number of books on the shelf
	def num_book
		return @books.length
	end
		
end

#Library Class
class Library
	def initialize
		@shelves = Array.new
	end

	#Adds a shelf to the library
	def add_shelf
		@shelves.push(Shelf.new)
	end

	#Adds book to library
	def store_book(shelf_num, book)
		if shelf_num > @shelves.length - 1 && shelf_num < 0
			puts "Shelf does not exist"
		else
			@shelves[shelf_num].add_book(book)
			book.enshelf(shelf_num)
		end
	end	

	#Displays the number of shelves in the Library
	def num_shelf
		puts "Library has #{@shelves.length} shelves"
	end

	#Displays all the books in the library
	def display_lib
		i=0
		while i < @shelves.length
			if @shelves[i].num_book != nil
				@shelves[i].display_shelf
			end
			i+=1
		end
	end	

end

#create new Library
lib = Library.new
#add a shelf to the library
lib.add_shelf
#displays the amount of shelves in the library
lib.num_shelf
#creates a book
dogbook = Book.new("Jeffery Sandock", "How to Play with Dogs", "Penguin Publications", 2012)
#checks to see if dogbook is already on the shelf
dogbook.unshelf
#adds book to a specific shelf
lib.store_book(0, dogbook)
#displays whole library of book
lib.display_lib

