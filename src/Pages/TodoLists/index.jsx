import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../../firebase";

import { withHocks } from '../../Context/WithParams';

import Form from "./Components/Form";
import Card from '../../Components/Card';
import Badge from '../../Components/Badge';
import Loading from "../../Components/Loading";
import Image from "../../Components/Image";

import { catchError } from '../../Helper/helper';

import { DEFAULT_IMAGE } from "../../Enum/DefaultValue";

class TodoLists extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            userDetail: {
                displayName: '',
                email: '',
                photoURL: DEFAULT_IMAGE,
                userDesc: '',
            },
            isLoading: true,
        };
    }

    componentDidMount = () => {
        this.getUserDetail();
    }

    getUserDetail = async () => {
        const { loadingParam: { dispatchLoading }, params: { uid }} = this.props;

        try {
            const data = await query(collection(db, "users"), where("uid", "==", uid));
            const res = await getDocs(data);
            const userDetail = res.docs.map(doc => doc.data())[0];

            this.setState({
                userDetail,
                isLoading: false,
            })
        } catch (err) {
            NotificationManager.error(catchError(err), 'Terjadi Kesalahan', 5000);
        } finally {
            dispatchLoading(false);
        }
    }

    render() {
        const {
            userDetail: {
                displayName, email, photoURL, userDesc
            }, isLoading,
        } = this.state;
        const { params: { uid }} = this.props;

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-9">
                            <Form mainTask={uid} />
                        </div>
                        <div className="col-md-3">
                            <Card type="card-primary card-outline">
                                {
                                    isLoading ? (
                                        <div className="overlay position-relative" style={{ height: "400px" }}>
                                            <Loading />
                                        </div>
                                    ) : (
                                        <div className="box-profile">
                                            <div className="text-center">
                                                <Image
                                                    className="profile-user-img img-fluid img-circle"
                                                    src={photoURL}
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover '}}
                                                    alt="User-profile"
                                                />
                                            </div>

                                            <h3 className="profile-username text-center">
                                                {displayName}
                                                <br />
                                                <small>{email}</small>
                                            </h3>
                                            <p className="text-muted text-center">{userDesc}</p>
                                            <ul className="list-group list-group-unbordered mb-3">
                                                <li className="list-group-item">
                                                    <b>Total Kegiatan</b>
                                                    <b className="float-right">
                                                        15
                                                    </b>
                                                </li>
                                                <li className="list-group-item">
                                                    <b>Total Selesai</b>
                                                    <b className="float-right">
                                                        <Badge className="badge bg-success" label="15" />
                                                    </b>
                                                </li>
                                                <li className="list-group-item">
                                                    <b>Total Belum Selesai</b>
                                                    <b className="float-right">
                                                        <Badge className="badge bg-danger" label="5" />
                                                    </b>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default withHocks(TodoLists);
