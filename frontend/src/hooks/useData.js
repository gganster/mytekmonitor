import axios from 'axios';
import { useState, useEffect } from 'react';

const useData = (apiUrl) => {

    const[cpu,setCPU]=useState([]);
    const[memory,setMemory]=useState([]);
    const [ip, setIP] = useState([]);
    const [quickLook, setQuickLook]= useState([]);
    const [sysInfo, setSysInfo] = useState ([]);
    const [upTime, setUpTime] = useState([]);
    const [systemCount, setSystemCount] = useState([]);
    const [localHour,setLocalHour]=useState([]);
    const [diskIo, setDiskIo] = useState([]);
    const [amps, setAmps] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        //componentDidMount
        let interval = setInterval(() => {
          //ici ça tourne tout le temps en arriere plan
          _fetchData();
          setLoading(false);
        }, 5000)
        //En dessous les donnée "fixe" (pas besoin de les actualisées)
        _fetchIP();
        _fetchSystemInfo();
        return () => clearInterval(interval);
    }, [])
      
    const _fetchData = async () => { //ici les donnée qu'on veut actualiser toute les 5 secondes
        try {
        setLoading(true);
        await Promise.all([ //le try catch prefere await pour le bon fonctionnement du code
        _fetchCPU(),
        _fetchMemory(),
        _fetchUpTime(),
        _fetchProcessCount(),
        _fetchSystemHour(),
        _fetchDiskio(),
        _fetchAmp(),
        _fetchQuickLook() ]);

        } catch(e) {
            setError(e);
            console.log(e);
        }
    }

    const _fetchCPU = async () => {
        let res=(await axios.post(`/api/glances`, {uri: `${apiUrl}/api/3/cpu`}));
        setCPU(res.data);
    }
    const _fetchMemory = async () => {
        //ici ça tourne tout le temps en arriere plan
        let res=(await axios.post(`/api/glances`, {uri: `${apiUrl}/api/3/mem`}));
        setMemory(res.data);
    }
    const _fetchIP = async () => {
        let res=(await axios.post(`/api/glances`, {uri: `${apiUrl}/api/3/ip`}));
        setIP(res.data);
    }
    const _fetchQuickLook = async () => {
        let res=(await axios.post(`/api/glances`, {uri: `${apiUrl}/api/3/quicklook`}));
        setQuickLook(res.data);
    }
    const _fetchSystemInfo = async () => {
        let res=(await axios.post(`/api/glances`, {uri: `${apiUrl}/api/3/system`}));
        setSysInfo(res.data);
    }
    const _fetchUpTime = async () => {
        let res=(await axios.post(`/api/glances`, {uri: `${apiUrl}/api/3/uptime`}));
        setUpTime(res.data);
    }
    const _fetchProcessCount = async () => {
        let res=(await axios.post(`/api/glances`, {uri: `${apiUrl}/api/3/processcount`}));
        setSystemCount(res.data);
    }
    const _fetchSystemHour = async () => {
        let res= (await axios.post(`/api/glances`, {uri: `${apiUrl}/api/3/now`})); 
        setLocalHour(res.data);
    }
    const _fetchDiskio = async () => {
        let res= (await axios.post(`/api/glances`, {uri: `${apiUrl}/api/3/diskio`})); 
        setDiskIo(res.data);
    }
    const _fetchAmp = async () => {
        let res= (await axios.post(`/api/glances`, {uri: `${apiUrl}/api/3/amps`})); 
        setAmps(res.data);
    }

    return {cpu,memory, ip, quickLook, sysInfo,upTime,systemCount,localHour, diskIo, amps, loading, error};
};

export default useData;