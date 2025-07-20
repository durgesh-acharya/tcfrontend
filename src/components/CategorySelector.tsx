import { useState } from 'react';

interface Category {
  id: number;
  category: string;
}

interface CategorySelectorProps {
  categories: Category[];
  onCategorySelect: (categoryId: number | null) => void;
  selectedCategory: number | null;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  categories, 
  onCategorySelect,
  selectedCategory
}) => {
 
  const handleSelectCategory = (id: number) => {
   
    const newSelected = id === selectedCategory ? null : id;
    onCategorySelect(newSelected);
  };

  return (
    <div>
      <h6 className="m-2 pb-2 font-semibold text-md">Choose Stay Category</h6>
      {/* <div style={styles.categoryRow}>
        {categories.map((category) => (
          <div
            key={category.id}
            style={{
              ...styles.categoryItem,
              backgroundColor: selectedCategory === category.id ? 'yellow' : 'white',
              color: 'black',
            }}
            onClick={() => handleSelectCategory(category.id)}
          >
            {category.id}. {category.category}
          </div>
        ))}
      </div> */}
          <div className='flex space-between'>
              {
                categories.map((category) => (
                  <div
                  className={`space-x-2 border p-4 m-2 rounded-lg shadow-md' cursor-pointer transition-all ${
                    selectedCategory === category.id ? 'bg-black text-white shadow-3xl transform scale-105' : 'bg-white text-black'
                   }`}
                  key={category.id}
                  onClick={()=> handleSelectCategory(category.id)}
                  >
                     <h2 className="text-md font-semibold">{category.category}</h2>
                  </div>
                ))
              }
          </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '80%',
    margin: '0 auto',
  },
  categoryRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  categoryItem: {
    padding: '10px 20px',
    marginBottom: '10px',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    width: '30%',
    textAlign: 'center' as 'center',
  } as React.CSSProperties,
};

export default CategorySelector;
