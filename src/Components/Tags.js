import React from "react";
import { TagsURL } from '../utilities/constants';
import LoaderFile from "./LoaderFile";

class Tags extends React.Component {
    constructor(props){
      super();
      this.state = {
            tags : null,
            errors : "",
        }     
    }

    componentDidMount = () => {
    fetch(TagsURL)
          .then((res) => {
            if(!res.ok){
              throw new Error(res.statusText)
            }
            return res.json();
          })
          .then((data) => this.setState({ tags: data.tags, error:""})
          ).catch((err) => {
            this.setState({ error: 'Not able to fetch Tags' });
          });
      };
      
    render(){
      let { error, tags } = this.state;

      if (error) {
        return <h2 className="text-red-500 text-center text-xl mt-8">{error}</h2>;
      }
      if (!tags) {
        return <LoaderFile />;
      }
        return(
            <aside className="tags p-5">
                <h4 className="mb-3" >Popular Tags</h4>
                {
                tags.map((tag) => {
                  return <button onClick={this.props.selectTag} className="bg-gray-500 text-white p-1 px-2 m-0.5 text-xs rounded-full" key={tag} data-value={tag}>{tag}</button>
                })
                }
            </aside>
        )
    }
}

export default Tags;