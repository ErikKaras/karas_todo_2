"use client";
import React, {
    ChangeEvent,
    useRef,
    useState,
    useCallback,
    useEffect,
} from "react";
import { FormEvent } from "react";
import { toast } from "sonner";
import TaskForm from "@/components/shared/TaskForm";
import RenderTasks from "@/components/shared/RenderTasks";
import { Button } from "@/components/ui/button";
import { create } from "./actions/todoActions";

const Page = () => {
    const [currentTask, setCurrentTask] = useState("");
    const [taskList, setTaskList] = useState<{ task: String; date: String }[]>(
        []
    );
    const [deleting, setDeleting] = useState<number | null>(null);
    const [shouldScroll, setShouldScroll] = useState(false);

    const endOfTasksRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const FocusInputField = useCallback(() => {
        const inputElement = inputRef.current;
        if (inputElement) {
            const top =
                inputElement.getBoundingClientRect().top + window.scrollY - 200;
            window.scrollTo({ top, behavior: "smooth" });
            setTimeout(() => {
                inputRef.current?.focus();
            }, 300);
        }
    }, []);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTask(e.target.value);
    }, []);

    const handleSubmit = useCallback(
        (event: FormEvent) => {
            event.preventDefault();
            if (currentTask.length) {
                const currentDate = new Date();
                const dateTimeString = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
                setTaskList([...taskList, { task: currentTask, date: dateTimeString }]);
                toast.success("Úkol byl přidán!");
                setCurrentTask("");
                setShouldScroll(true);
                setTimeout(() => {
                    endOfTasksRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 100);
            } else {
                toast.warning("Nic k přidání!");
            }
        },
        [currentTask, taskList]
    );

    useEffect(() => {
        if (shouldScroll) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
            });
            setShouldScroll(false);
        }
    }, [shouldScroll]);

    const deleteHandler = useCallback(
        (i: number) => {
            setDeleting(i);
            setTimeout(() => {
                const newTasks = [...taskList];
                newTasks.splice(i, 1);
                setTaskList(newTasks);
                setDeleting(null);
                toast.error("Úkol odstraněn!");
            }, 500);
        },
        [taskList]
    );

    return (
        <>
            <TaskForm
                task={currentTask}
                inputRef={inputRef}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />

            {/* Floating Add Task button to focus input field */}
            <div style={{ position: "fixed", bottom: "25px", right: "25px", zIndex: 999 }}>
                <Button type="button" className="rounded-full bg-red-500 text-white py-2 px-4 shadow-xl" onClick={FocusInputField}>
                    Přidat
                </Button>
            </div>

            {/*To render tasks */}
            <div className="flex flex-wrap justify-center gap-10 mt-8">
                {taskList.length > 0 ? (
                    taskList.map((item, i) => (
                        <RenderTasks
                            key={i}
                            task={item.task}
                            date={item.date}
                            index={i}
                            deleting={deleting}
                            deleteHandler={deleteHandler}
                        />
                    ))
                ) : (
                    <h1 className="text-red-400 font-semibold text-xl">
                        Žádné úkoly nejsou dostupné!
                    </h1>
                )}
            </div>
        </>
    );
};

export default Page;
