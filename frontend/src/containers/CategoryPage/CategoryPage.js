import React, { Component } from 'react';

import Category from '../../components/Category/Category';
import Navbar from '../../components/UI/Navbar/Navbar';
import axios from '../../axios-base';

class CategoryPage extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    axios.get('category/STUDENT').then(response => {
      this.setState({
        categories: response.data.result,
      });
    });
  }

  componentWillUnmount() {
    this.setState({
      categories: [],
    });
  }

  clickHandler = catName => {
    console.log(this.state.categories);
  };

  render() {
    const categoryList = this.state.categories.map(category => (
      <Category
        key={category}
        categoryName={category}
        click={this.clickHandler}
      />
    ));

    return (
      <React.Fragment>
        <Navbar />
        <div className="container min-vh-100 bg-light d-flex flex-column justify-content-center">
          <h3 className="p-3 my-3 bg-white text-center text-secondary text-uppercase">
            Choose from the below categories
          </h3>

          <div className="col d-flex flex-wrap align-items-center">
            {categoryList}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CategoryPage;
