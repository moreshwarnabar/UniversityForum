import React, { Component } from 'react';
import { connect } from 'react-redux';

import Category from '../../components/Category/Category';
import Navbar from '../../components/UI/Navbar/Navbar';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/creators/category';

class CategoryPage extends Component {
  componentDidMount() {
    if (!this.props.user || this.props.user.role === 'ADMIN') {
      this.props.history.replace('/');
      return;
    }

    const role = this.props.user.role;
    this.props.onPageLoad(role);
  }

  clickHandler = event => {
    const categoryId = +event.target.dataset.id;
    const category = this.props.categories.find(cat => cat.id === categoryId);

    this.props.onSelectCategory(category);
    this.props.history.replace('/questions');
  };

  render() {
    const categoryList = this.props.categories?.map(category => (
      <Category
        key={category.id}
        categoryName={category.name}
        click={this.clickHandler}
        id={category.id}
      />
    ));

    return (
      <React.Fragment>
        <Navbar />
        <div className="container min-vh-100 bg-light d-flex flex-column justify-content-center">
          {this.props.isFetching ? (
            <div className="align-self-center">
              <Spinner loading={true} size={250} />
            </div>
          ) : (
            <React.Fragment>
              <h3 className="p-3 my-3 bg-white text-center text-secondary text-uppercase">
                Choose from the below categories
              </h3>

              <div className="col d-flex flex-wrap align-items-center">
                {categoryList}
              </div>
            </React.Fragment>
          )}
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
  onPageLoad: role => dispatch(actions.fetchCategories(role)),
  onSelectCategory: categoryId => dispatch(actions.selectCategory(categoryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
