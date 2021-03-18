import React, { Component } from 'react'
import Category from '../../components/Category/Category'
import axios from 'axios'
class CategoryPage extends Component {
   state = {
      categories: []
   }
   componentDidMount() {
      axios.get("http://localhost:8080/forum/category/STUDENT")
         .then(
            (response) => {
               console.log(response.data)
               this.setState({
                  categories: response.data.result
               })
            }
         )
   }
   componentWillUnmount() {
      this.setState({
         categories: []
      })
   }

   clickHandler = (catName) => {
      alert(`${catName} clicked`)
   }

   render() {

      const categoryList = this.state.categories.map(category => (
         <Category key={category} categoryName={category} click={this.clickHandler} />
      ))
      return (
         <div className="container">
            <h3 className="shadow p-3 mb-5 bg-white rounded text-center text-secondary">
               Choose from the below categories
            </h3>
            <div className="row-shadow p-3 mb-5 bg-white rounded text-center text-secondary align-center">
               <div className="col">{categoryList}</div>
            </div>
         </div>

      )

   }
}
export default CategoryPage;