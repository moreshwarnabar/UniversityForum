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
    alert(`${catName} clicked`);
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
        <div className="container bg-light">
          <h3 className="shadow p-3 mb-5 bg-white rounded text-center text-secondary">
            Choose from the below categories
          </h3>
          <div className="row-shadow p-3 mb-5 bg-white rounded text-center text-secondary align-center">
            <div className="col">{categoryList}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CategoryPage;
