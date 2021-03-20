import React, { Component } from 'react';
import { connect } from 'react-redux';

import Category from '../../components/Category/Category';
import Navbar from '../../components/UI/Navbar/Navbar';
import { fetchCategories } from '../../store/actions/creators/category';

class CategoryPage extends Component {
  componentDidMount() {
    if (!this.props.user || this.props.user.role === 'ADMIN') {
      this.props.history.replace('/');
      return;
    }

    const role = this.props.user.role;
    this.props.onPageLoad(role);
  }

  clickHandler = catName => {
    console.log(this.props.categories);
    this.props.history.push(`/categories/${catName}`);
  };

  render() {
    const categoryList = this.props.categories?.map(category => (
      <Category
        key={category.id}
        categoryName={category.name}
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

const mapStateToProps = state => ({
  ...state.category,
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: role => dispatch(fetchCategories(role)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
