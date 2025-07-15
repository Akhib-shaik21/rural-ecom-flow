
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { Search, Filter, ShoppingCart, Star } from 'lucide-react';

const PRODUCTS = [
  {
    id: '1',
    name: 'Organic Tomatoes',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1546470427-e8c0c9ed4f7e?ixlib=rb-4.0.3&w=300&q=80',
    category: 'Vegetables',
    rating: 4.8,
    inStock: true
  },
  {
    id: '2',
    name: 'Fresh Carrots',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?ixlib=rb-4.0.3&w=300&q=80',
    category: 'Vegetables',
    rating: 4.6,
    inStock: true
  },
  {
    id: '3',
    name: 'Organic Apples',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&w=300&q=80',
    category: 'Fruits',
    rating: 4.9,
    inStock: true
  },
  {
    id: '4',
    name: 'Fresh Spinach',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&w=300&q=80',
    category: 'Vegetables',
    rating: 4.7,
    inStock: true
  },
  {
    id: '5',
    name: 'Organic Bananas',
    price: 2.79,
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&w=300&q=80',
    category: 'Fruits',
    rating: 4.5,
    inStock: true
  },
  {
    id: '6',
    name: 'Bell Peppers',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1525607551862-4d197d17c9a0?ixlib=rb-4.0.3&w=300&q=80',
    category: 'Vegetables',
    rating: 4.4,
    inStock: true
  },
  {
    id: '7',
    name: 'Organic Broccoli',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-4.0.3&w=300&q=80',
    category: 'Vegetables',
    rating: 4.6,
    inStock: true
  },
  {
    id: '8',
    name: 'Fresh Oranges',
    price: 4.29,
    image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?ixlib=rb-4.0.3&w=300&q=80',
    category: 'Fruits',
    rating: 4.8,
    inStock: true
  }
];

const ProductsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  
  const { addToCart, getTotalItems } = useCart();
  const { toast } = useToast();

  const categories = ['All', 'Vegetables', 'Fruits'];

  const filteredProducts = PRODUCTS
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Fresh Products</h1>
            <p className="text-gray-600">Discover the finest organic produce from local farms</p>
          </div>
          <Link to="/cart">
            <Button className="bg-green-600 hover:bg-green-700 flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Cart ({getTotalItems()})</span>
            </Button>
          </Link>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-600">
                    {product.category}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">
                    ${product.price}
                  </span>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-xl mb-4">No products found</div>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsDashboard;
