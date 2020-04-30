import React from "react";
import {Switch, Route, Redirect} from "react-router-dom/"
import CreatePost from "./pages/CreatePost";
import MyPosts from "./pages/MyPosts";
import EditPost from "./pages/EditPost";
import Posts from "./pages/Posts";
import ReadPost from "./pages/ReadPost";
import CreateCategory from "./pages/CreateCategory";
import RoomsList from "./pages/RoomsList";
import AuthPage from "./pages/AuthPage";


export const useRoutes = (isAuthenticated, props) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/list" exact>
                    <RoomsList token = {props.token}/>
                </Route>
                <Route path="/create-post" exact>
                    <CreatePost token = {props.token} userId = {props.userId}/>
                </Route>
                <Route path="/myposts" exact>
                    <MyPosts token = {props.token} userId = {props.userId}/>
                </Route>
                <Route path="/read/:id?" exact>
                    <ReadPost token = {props.token} userId = {props.userId}/>
                </Route>
                <Route path="/edit/:id?" exact>
                    <EditPost token = {props.token} userId = {props.userId}/>
                </Route>
                <Route path="/posts" exact>
                    <Posts token = {props.token}/>
                </Route>
                <Route path="/create-category" exact>
                    <CreateCategory token = {props.token}/>
                </Route>
                <Redirect to="/create"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage login = {props.login}/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}
