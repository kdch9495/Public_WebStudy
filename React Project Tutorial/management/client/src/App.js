import React, {Component} from 'react';
import Customer from './components/Customer'; //customer component 적용
import CustomerAdd from './components/CustomerAdd';
import './App.css';

//material-ui: material-ui.com/demos/tables 공식 reference 참고하여 Table 작성하기
import Paper from '@material-ui/core/Paper'; // component의 외부를 감싸기 위한 component
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
// material-ui : App-bar // client 모듈에서 설치하기 npm install --save @material-ui/icons
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

// styles 변수 정의
const styles= theme => ({
  // 바깥 쪽에 해당하는 root
  root: {
    width: '100%',
    marginTop: theme.spacing(3), // 여백을 3의 가중치만큼 주기
    // overflowX: "auto" // X축으로 overflow가 작용
  },
  progress: {
    margin: theme.spacing(2)
  },
  menu: {
    // 가운데 정렬한 것임 15, 15, flex, center
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  grow: {
    flexGrow: 1,
  },
  tableHead: {
    fontSize: '1.0rem' // 테이블헤드의 글짜 크기
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  }
});

// const customers = [
//   {
//     'id' : 1,
//     'image' : 'http://placeimg.com/64/64/1',
//     'name' : '동찬',
//     'birthday' : '951221',
//     'gender' : '남성',
//     'job' : '직짱인'
//   },
//   {
//     'id' : 2,
//     'image' : 'http://placeimg.com/64/64/2',
//     'name' : '길동',
//     'birthday' : '951222',
//     'gender' : '남성',
//     'job' : '프로그래머'
//   },
//   {
//     'id' : 3,
//     'image' : 'http://placeimg.com/64/64/3',
//     'name' : '찬동',
//     'birthday' : '951223',
//     'gender' : '남성',
//     'job' : '직짱인3'
//     }
// ]

/*
--- Component Life Cycle ---
1) constructor() 불러오기
2) componentWillMount() 불러오기
3) render() Component가 실제로 화면에 그려짐 
4) componentDidMount() 불러와짐

props or state => shouldComponentUpdate()
props or state 변경되는 경우 shouldComponentUpdate() 등이 사용되어 render를 갱신해줌
*/

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0
    }
  }

  // 고객데이터가 추가되었을때(CustomerAdd.js) 실행되었을 때 수행될 수 있게 하면 됨
  // state 초기화 함수
  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0,
      searchKeyword: ''
    });
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20); // 0.02초마다 실행
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('api/customers');
    const body = await response.json(); // json 형태로 body 변수에 담겠다
    return body;
  }

  progress = () => {
    const {completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }

  // filter함수를 이용하여 고객검색 기능을 구현
  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c) => {
        return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} /> 
      });
    }
    const { classes } = this.props; // styles가 적용될 수 있게끔 함. props는 변경 불가능한 변수
    // 고객 데이터를 하나하나씩 표시하는 것 대신 배열 형태로 표현
    const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "설정"]
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              고객 관리 시스템
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색하기"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                name="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.menu}>
          <CustomerAdd stateRefresh={this.stateRefresh}/>
        </div>
        <Paper className={classes.paper}>
          {
          /*
          // 값을 하나만 화면에 출력하고 싶을 떄는 아래와 같이 사용 
          <Customer
            id={customers[0].id}
            image={customers[0].iamge}
            name={customers[0].name}
            birthday={customers[0].birthday}
            gender={customers[0].gender}
            job={customers[0].job}
          />
          */
          }
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {/* 
                Table헤드를 하나씩 보여주려면 이렇게 해야 함
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>설정</TableCell> */}
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                // 
                // this.state.customers ? this.state.customers.map(c => {
                //   return (
                //     <Customer
                //       stateRefresh={this.stateRefresh}
                //       key={c.id} // map을 사용할때는 key를 반드시 사용해야 함 
                //       id={c.id}
                //       image={c.image}
                //       name={c.name}
                //       birthday={c.birthday}
                //       gender={c.gender}
                //       job={c.job}
                //     />
                //   ) 
                // 위의 코드를 함수형태로 재구현
                this.state.customers ?
                  filteredComponents(this.state.customers):
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant ="determinate" value={this.state.completed}/>
                  </TableCell>
                </TableRow>
                }
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App);
