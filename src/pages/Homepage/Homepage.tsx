import classes from "./Homepage.module.scss";
import { ReactComponent as Hamburger } from "../../assets/icons/hamburger.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search_icon.svg";

const Homepage = () => {
  return (
    <div className={classes["homepage-container"]}>
      <div className={classes["header"]}>
        <div className={classes["icon-container"]}>
          <Hamburger />
        </div>
        <h1>Workflow Builder</h1>
      </div>

      <div className={classes["homepage-content"]}>
        <div className={classes["utility-container"]}>
          <div className={classes["search-input-container"]}>
            <input placeholder="Search By Workflow Name/ID"></input>
            <div className={classes["search-icon-wrapper"]}>
              <SearchIcon />
            </div>
          </div>
          <button className={classes["create-new-btn"]}>
            + Create New Process
          </button>
        </div>

        <div className={classes["table-wrapper"]}></div>
      </div>
    </div>
  );
};

export default Homepage;
