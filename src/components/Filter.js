import React, { useState } from 'react';
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Filter.css';

const Filter = ({
  onPageSizeChange,
  onNameFilterChange,
  onEmailFilterChange,
  onBirthdayFilterChange,
  onGenderFilterChange,
  onTitleFilterChange,
  onBrandFilterChange,
  onCategoryFilterChange,
  currentName,
  currentEmail,
  currentBirthday,
  currentGender,
  currentTitle,
  currentBrand,
  currentCategory,
  currentPageSize,
  onSearchChange,
  activeTab,
  setActiveTab,
  showTabs,
  isUserFilter,
  categories,
  brands,
}) => {
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const [isNameVisible, setIsNameVisible] = useState(false);
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [isBirthdayVisible, setIsBirthdayVisible] = useState(false);
  const [isGenderVisible, setIsGenderVisible] = useState(false);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isBrandVisible, setIsBrandVisible] = useState(false);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle page size change
  const handlePageSizeChange = (e) => {
    const newPageSize = Number(e.target.value);
    onPageSizeChange(newPageSize);
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearchChange(newSearchTerm);
  };

  // Reset all filters except the one being selected and the search input
  const collapseAllExcept = (filterName) => {
    if (isUserFilter) {
      if (filterName !== 'name') onNameFilterChange('');
      if (filterName !== 'email') onEmailFilterChange('');
      if (filterName !== 'birthday') onBirthdayFilterChange('');
      if (filterName !== 'gender') onGenderFilterChange('');
    } else {
      if (filterName !== 'title') onTitleFilterChange('');
      if (filterName !== 'brand') onBrandFilterChange('');
      if (filterName !== 'category') onCategoryFilterChange('');
    }

    // Toggle visibility of the selected filter while hiding others
    setIsNameVisible(filterName === 'name' ? !isNameVisible : false);
    setIsEmailVisible(filterName === 'email' ? !isEmailVisible : false);
    setIsBirthdayVisible(filterName === 'birthday' ? !isBirthdayVisible : false);
    setIsGenderVisible(filterName === 'gender' ? !isGenderVisible : false);
    setIsTitleVisible(filterName === 'title' ? !isTitleVisible : false);
    setIsBrandVisible(filterName === 'brand' ? !isBrandVisible : false);
    setIsCategoryVisible(filterName === 'category' ? !isCategoryVisible : false);
  };

  return (
    <div className="filter-container">
      {/* Tabs for ALL and LAPTOPS */}
      {showTabs && (
        <div className="tabs">
          <button
            onClick={() => setActiveTab('ALL')}
            className={activeTab === 'ALL' ? 'active-tab' : 'tab'}
          >
            ALL
          </button>
          <button
            onClick={() => setActiveTab('LAPTOPS')}
            className={activeTab === 'LAPTOPS' ? 'active-tab' : 'tab'}
          >
            LAPTOPS
          </button>
        </div>
      )}

      <div className="filter-row">
        {/* Page Size Dropdown */}
        <div className="filter-group">
          <label htmlFor="pageSize" className="filter-label">Page Size:</label>
          <select id="pageSize" onChange={handlePageSizeChange} value={currentPageSize}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="search-container">
          <button
            className="search-button"
            onClick={() => setIsSearchInputVisible(!isSearchInputVisible)}
          >
            <FaSearch />
          </button>
          {isSearchInputVisible && (
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchInputChange}
              className="search-input"
            />
          )}
        </div>

        {/* Name Filter (for Users) */}
        {isUserFilter && (
          <div className="filter-group">
            <label htmlFor="name" className="filter-label">Name:</label>
            <button
              className="toggle-button"
              onClick={() => collapseAllExcept('name')}
            >
              {isNameVisible ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isNameVisible && (
              <input
                type="text"
                id="name"
                value={currentName}
                onChange={(e) => onNameFilterChange(e.target.value)}
                placeholder="Enter name"
                className="input-field"
              />
            )}
          </div>
        )}

        {/* Email Filter (for Users) */}
        {isUserFilter && (
          <div className="filter-group">
            <label htmlFor="email" className="filter-label">Email:</label>
            <button
              className="toggle-button"
              onClick={() => collapseAllExcept('email')}
            >
              {isEmailVisible ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isEmailVisible && (
              <input
                type="text"
                id="email"
                value={currentEmail}
                onChange={(e) => onEmailFilterChange(e.target.value)}
                placeholder="Enter email"
                className="input-field"
              />
            )}
          </div>
        )}

        {/* Birthday Filter (for Users) */}
        {isUserFilter && (
          <div className="filter-group">
            <label htmlFor="birthday" className="filter-label">Birthday:</label>
            <button
              className="toggle-button"
              onClick={() => collapseAllExcept('birthday')}
            >
              {isBirthdayVisible ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isBirthdayVisible && (
              <input
                type="date"
                id="birthday"
                value={currentBirthday}
                onChange={(e) => onBirthdayFilterChange(e.target.value)}
                className="input-field"
              />
            )}
          </div>
        )}

        {/* Gender Filter (for Users) */}
        {isUserFilter && (
          <div className="filter-group">
            <label htmlFor="gender" className="filter-label">Gender:</label>
            <button
              className="toggle-button"
              onClick={() => collapseAllExcept('gender')}
            >
              {isGenderVisible ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isGenderVisible && (
              <select
                id="gender"
                value={currentGender}
                onChange={(e) => onGenderFilterChange(e.target.value)}
                className="input-field"
              >
                <option value="">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            )}
          </div>
        )}

        {/* Title Filter (for Products) */}
        {!isUserFilter && (
          <div className="filter-group">
            <label htmlFor="title" className="filter-label">Title:</label>
            <button
              className="toggle-button"
              onClick={() => collapseAllExcept('title')}
            >
              {isTitleVisible ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isTitleVisible && (
              <input
                type="text"
                id="title"
                value={currentTitle}
                onChange={(e) => onTitleFilterChange(e.target.value)}
                placeholder="Enter title"
                className="input-field"
              />
            )}
          </div>
        )}

        {/* Brand Filter (for Products) */}
        {!isUserFilter && (
          <div className="filter-group">
            <label htmlFor="brand" className="filter-label">Brand:</label>
            <button
              className="toggle-button"
              onClick={() => collapseAllExcept('brand')}
            >
              {isBrandVisible ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isBrandVisible && (
              <select
                id="brand"
                value={currentBrand}
                onChange={(e) => onBrandFilterChange(e.target.value)}
                className="input-field"
              >
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        {/* Category Filter (for Products) */}
        {!isUserFilter && (
          <div className="filter-group">
            <label htmlFor="category" className="filter-label">Category:</label>
            <button
              className="toggle-button"
              onClick={() => collapseAllExcept('category')}
            >
              {isCategoryVisible ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isCategoryVisible && (
              <select
                id="category"
                value={currentCategory}
                onChange={(e) => onCategoryFilterChange(e.target.value)}
                className="input-field"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
