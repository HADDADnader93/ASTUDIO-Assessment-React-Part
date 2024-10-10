import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Table from '../components/Table';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [titleFilter, setTitleFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [activeTab, setActiveTab] = useState('ALL'); 
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]); 
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    document.title = "Products Page"; 
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      const params = {
        limit: pageSize,
        skip: (currentPage - 1) * pageSize,
        ...(titleFilter && { title: titleFilter }),
        ...(brandFilter && { brand: brandFilter }),
        ...(categoryFilter && { category: categoryFilter }),
      };

      const res = await axios.get(`https://dummyjson.com/products`, { params });
      setProducts(res.data.products);
      setTotalProducts(res.data.total);

      const uniqueCategories = [...new Set(res.data.products.map(product => product.category))];
      const uniqueBrands = [...new Set(res.data.products.map(product => product.brand))];
      setCategories(uniqueCategories);
      setBrands(uniqueBrands);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, [pageSize, currentPage, titleFilter, brandFilter, categoryFilter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const displayedProducts = products.filter(product => {
    const matchesSearch = 
      product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTitle = titleFilter ? product.title?.toLowerCase().includes(titleFilter.toLowerCase()) : true;
    const matchesBrand = brandFilter ? product.brand?.toLowerCase().includes(brandFilter.toLowerCase()) : true;
    const matchesCategory = categoryFilter ? product.category?.toLowerCase().includes(categoryFilter.toLowerCase()) : true;

    // Show only laptops if the active tab is 'LAPTOPS'
    if (activeTab === 'LAPTOPS') {
      return matchesSearch && matchesTitle && matchesBrand && product.category?.toLowerCase() === 'laptops';
    }

    return matchesSearch && matchesTitle && matchesBrand && matchesCategory;
  });

  const productColumns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Brand', accessor: 'brand' },
    { header: 'Category', accessor: 'category' },
    { header: 'Price', accessor: 'price' },
    { header: 'Stock', accessor: 'stock' },
    { header: 'Rating', accessor: 'rating' },
  ];

  return (
    <div>
      <Filter
        onPageSizeChange={setPageSize}
        onTitleFilterChange={setTitleFilter}
        onBrandFilterChange={setBrandFilter}
        onCategoryFilterChange={setCategoryFilter}
        currentTitle={titleFilter}
        currentBrand={brandFilter}
        currentCategory={categoryFilter}
        currentPageSize={pageSize}
        onSearchChange={setSearchTerm}
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        showTabs={true}
        categories={categories}
        brands={brands}
      />
      <Table
        data={displayedProducts}
        columns={productColumns}
      />
      <Pagination 
        currentPage={currentPage} 
        totalItems={totalProducts} 
        pageSize={pageSize}
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default Products;
