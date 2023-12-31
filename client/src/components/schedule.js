import {
    Scheduler,
    TimelineView,
    DayView,
    WeekView,
    MonthView,
    AgendaView,
} from "@progress/kendo-react-scheduler";
import { useEffect, useState } from "react";
import { guid } from "@progress/kendo-react-common";

const compareById = matchingItem => item => matchingItem.id === item.id;

const RoomScheduler = props => {
    const student = props.user
    const [data, setData] = useState([]);
    async function getDataSchedule() {
        try {
            let result = await fetch(`http://localhost:8080/api/schedule/${student.id}`, { method: 'GET' })
            result = await result.json();
            console.log(result);            
            let tmpArr = [...data]
            if (result != []) {
                result.map(item => {
                    item.data = JSON.parse(item.data);
                    item.data.end = new Date(item.data.end);
                    item.data.start = new Date(item.data.start)
                    tmpArr = [...tmpArr, item.data]
                    if (result[0].data) result[0].end = new Date(result[0].end)
                    if (result[0].data) result[0].start = new Date(result[0].start)
                }
                )
            }
            setData(tmpArr)
            console.log("tmpArr",tmpArr);
        }
        catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        getDataSchedule()
    }, [])


    const onDataChange = ({ created, updated, deleted }) => {
        console.log("created", created);
        console.log("updated", updated);
        console.log("deleted", deleted);


        // Add a unique id to each new item
        const newItemsWithIds = created.map(item => ({
            ...item,
            id: guid(),
        }));

        setData(dataState =>
            dataState.reduce((acc, item) => {
                // Skip the item if it was deleted
                if (deleted.find(compareById(item))) return acc;
                // Push the updated item or current item
                acc.push(updated.find(compareById(item)) || item);
                return acc;
            }, newItemsWithIds)
        );

        const method = deleted.length > 0 ? 'DELETE' : updated.length > 0 ? 'PUT' : 'POST';

        switch (method) {
            case 'POST':
                console.log('post',newItemsWithIds[0]);
                updateSchedule(student.id, newItemsWithIds[0], 'POST');
                break;
            case 'PUT':
                console.log('put',updated[0]);
                updateSchedule(student.id, updated[0], 'PUT');
                break;
            case 'DELETE':
                console.log('delete', deleted[0]);
                updateSchedule(student.id, deleted[0], 'DELETE');
                break;
        }
    };

    const updateSchedule = async (id, item, method) => {
        try {
            let result = await fetch(`http://localhost:8080/api/schedule/${id}`, {
                method: method,
                body: JSON.stringify(item),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            result = await result.json();
            console.log('after fetch',result);
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="k-my-8">
            <Scheduler             
                editable
                data={data}
                onDataChange={onDataChange}
            >
                <TimelineView />
                <DayView />
                <WeekView />
                <MonthView />
                <AgendaView />
            </Scheduler>
        </div>
    );
};

export default RoomScheduler;