import React, { Component } from 'react';
import { FieldFeedback, FieldFeedbacks } from "react-form-with-constraints";
import update from "immutability-helper";

import { withHocks } from '../../../Context/WithParams';

import FormValidation from '../../../Components/FormValidation';
import Modals from '../../../Components/Modals';
import InputText from '../../../Components/form/InputText';
import InputWithIcon from '../../../Components/form/InputWithIcon';

import InputSelect from '../../../Components/form/InputSelect';
import InputTextArea from '../../../Components/form/InputTextArea';
import InputFile from '../../../Components/form/InputFile';

import fireBaseTime from '../../../Helper/fireBaseTime';
import { GENERATE_ERROR_MESSAGE } from '../../../Helper/error';

import { STATUS_LIST } from './config';
import { FORM_TYPES } from '../../../Enum/Form';

class TodoForm extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            form: {
                id: '',
                title: '',
                icon: 'fas fa-solid fa-circle',
                note: '',
                orderNumber: '',
                task: '',
                statusFinish: false,
                createdDate: null,
                finishDate: null,
                updatedDate: null,
            },
            isFormSubmitted: false,
            onSend: false,
            isLoading: true,
        };
    }

    componentDidMount = () => {
        const { data, type } = this.props;

        if (type === FORM_TYPES.EDIT) {
            this.setState({
                form: data,
            })
        }
    }
    
    _onInputChangeValidate = ({ target }) => {
        this.formDetail.validateInput(target);
    };

    _changeInputHandler = async (type, val, e) => {
        const { form, isFormSubmitted } = this.state;

        if (isFormSubmitted) {
            const onInputChangeValidate = this._onInputChangeValidate(e);
            await onInputChangeValidate;
        }

        const newForm = update(form, {
            [type]: { $set: val },
        });

        this.setState({
            form: newForm,
        });
    };

    submitHandel = async () => {
        const isFormValid = await this.formDetail.validateForm();

        if (isFormValid) {
            this.setState({
                loading: true,
            }, async () => {
                this.setState({
                    onSend: true,
                }, async () => {
                    await this.handleSubmit();
                })
            });
        }
    
        this.setState({
          isFormSubmitted: true,
        });
    }

    setImage = (val) => {
        const { form } = this.state;

        const newForm = update(form, {
            'attact': { $set: val },
        });

        this.setState({
            form: newForm,
        });
    }

    render() {
        const {
            form: {
                title, icon, task, orderNumber, statusFinish,
                note, attact,
                createdDate, finishDate, updatedDate,
            }
        } = this.state;
        const {
            idModal, buttonIcon, btnSubmitText, typeModal, buttonLabel, className,
            headerTitle,
        } = this.props;

        console.log(statusFinish);
        return (
                <Modals
                    idModal={idModal}
                    buttonIcon={buttonIcon}
                    typeModal={typeModal}
                    className={className}
                    btnSubmitText={btnSubmitText}
                    buttonSubmitIcon="fa fa-save mr-2"
                    buttonLabel={buttonLabel}
                    headerTitle={headerTitle}
                    btnSubmitHandel={() => { this.submitHandel(); }}
                    modalLarge
                >
                    <FormValidation ref={(c) => { this.formDetail = c; }}>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Judul Kegiatan</label>
                                    <InputText
                                        placeholder="Judul Kegiatan"
                                        name="title"
                                        value={title}
                                        changeEvent={(val, e) => this._changeInputHandler('title', val, e)}
                                        required
                                    />
                                    <FieldFeedbacks for="title">
                                        <FieldFeedback when="valueMissing">
                                            {GENERATE_ERROR_MESSAGE('Title', 'valueMissing')}
                                        </FieldFeedback>
                                    </FieldFeedbacks>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="form-group">
                                    <label>Kegiatan</label>
                                    <InputText
                                        placeholder="Kegiatan"
                                        name="task"
                                        value={task}
                                        changeEvent={(val, e) => this._changeInputHandler('task', val, e)}
                                        required
                                    />
                                    <FieldFeedbacks for="task">
                                        <FieldFeedback when="valueMissing">
                                            {GENERATE_ERROR_MESSAGE('Task', 'valueMissing')}
                                        </FieldFeedback>
                                    </FieldFeedbacks>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Catatan</label>
                                    <InputTextArea                                  
                                        value={note}
                                        changeEvent={(val, e) => this._changeInputHandler('note', val, e)}
                                        row="10"
                                        name="note"
                                        placeholder="Catatan"
                                        required
                                    />
                                    <FieldFeedbacks for="note">
                                        <FieldFeedback when="valueMissing">
                                            {GENERATE_ERROR_MESSAGE('Catatan', 'valueMissing')}
                                        </FieldFeedback>
                                    </FieldFeedbacks>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label>File</label>
                                <InputFile                           
                                    value={attact}
                                    placeHolder="Pilih File"
                                    changeEvent={(val) => this.setImage(val)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Urutan Tugas</label>
                                    <InputText
                                        type="number"
                                        placeholder="Urutan Tugas"
                                        name="sortingTask"
                                        value={orderNumber}
                                        changeEvent={(val, e) => this._changeInputHandler('orderNumber', val, e)}
                                        required
                                    />
                                    <FieldFeedbacks for="sortingTask">
                                        <FieldFeedback when="valueMissing">
                                            {GENERATE_ERROR_MESSAGE('Urutan Tugas', 'valueMissing')}
                                        </FieldFeedback>
                                    </FieldFeedbacks>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>
                                        Icon
                                        <small className='ml-1'>
                                            <a href="https://remixicon.com/" target='_blank' rel="noreferrer">
                                                Custom Icon untuk refensi
                                            </a>
                                        </small>
                                    </label>
                                    <InputWithIcon
                                        icon={icon}
                                        placeholder="Icon"
                                        name="icon"
                                        value={icon}
                                        changeEvent={(val, e) => this._changeInputHandler('icon', val, e)}
                                        required
                                    />
                                    <FieldFeedbacks for="icon">
                                        <FieldFeedback when="valueMissing">
                                            {GENERATE_ERROR_MESSAGE('Icon', 'valueMissing')}
                                        </FieldFeedback>
                                    </FieldFeedbacks>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Status Kegiatan</label>
                                    <InputSelect
                                        data={STATUS_LIST}
                                        value={statusFinish}
                                        placeholder="Status kegiatan"
                                        changeEvent={(val, e) => this._changeInputHandler('statusFinish', val, e)}
                                        name="status"
                                        required
                                    />
                                    <FieldFeedbacks for="status">
                                        <FieldFeedback when="valueMissing">
                                            {GENERATE_ERROR_MESSAGE('Status Kegiatan', 'valueMissing')} 
                                        </FieldFeedback>
                                    </FieldFeedbacks>
                                </div>
                            </div>
                        </div>
                        
                        {
                            statusFinish ? (
                                <div className="form-group">
                                    <label>Di Selesaikan Pada</label>
                                    <InputText
                                        name="finishDate"
                                        value={
                                            `${fireBaseTime(finishDate).toDateString().toString("MMMM yyyy")} - ${fireBaseTime(finishDate).toLocaleTimeString()}`
                                        }
                                        disabled
                                    />
                                </div>
                            ) : (
                                <></>
                            )
                        }

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Di Buat Pada</label>
                                    <InputText
                                        name="createdDate"
                                        value={
                                            `${fireBaseTime(createdDate).toDateString().toString("MMMM yyyy")} - ${fireBaseTime(createdDate).toLocaleTimeString()}`
                                        }
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Di Ubah Pada</label>
                                    <InputText
                                        name="updatedDate"
                                        value={
                                            `${fireBaseTime(updatedDate).toDateString().toString("MMMM yyyy")} - ${fireBaseTime(updatedDate).toLocaleTimeString()}`
                                        }
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </FormValidation>
                </Modals>
        );
    };
};

export default withHocks(TodoForm);