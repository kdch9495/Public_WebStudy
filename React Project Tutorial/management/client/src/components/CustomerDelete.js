import React from 'react';
// Material UI Madal design 구현
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'; 

class CustomerDelete extends React.Component {
    // 생성자 명시하여 state값 초기화할 수 있도록 해줌
    constructor(props) {
        super(props);
        this.state = {
            open: false // modal창이 열려있는지 check 
        }
    }

    // 고객 추가 버튼을 눌렀을 때, 고객 추가 modal 팝업창이 뜨도록 할 때 사용하는 함수
    handleClickOpen = () => { // = () => {} 바인딩 처리 : 동빈나유튜브: React 기초이론 학습하기
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    deleteCustomer(id) {
        // /api/customers/7 : 7인 고객을 삭제하겠다 이런 뜻
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    render() {
        return (
            <div>
                {/* 디자인을 바꾸기 위해 variant="contained"를 속성으로 넣어줌 */}
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}

export default CustomerDelete;