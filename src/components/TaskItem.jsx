import React, { useState } from 'react'
import { CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import styles from './modules/Task.module.css'

export const TaskItem = ({ task, deleteTask, toggleTask, enterEditMode }) => {

    const [isChecked, setIsChecked] = useState(task.checked)

    const handleCheckboxChange = (e) => {
        setIsChecked(!isChecked)
        toggleTask(task.id)
    }

    return (
        <li className={styles.task}>
            <div className={styles["task-group"]}>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={isChecked}
                    name={task.name}
                    id={task.id}
                    onChange={handleCheckboxChange}
                />
                <label
                    htmlFor={task.id}
                    className={styles.label}
                >
                    {task.name}
                    <p
                        className={styles.checkmark}
                    >
                        <CheckIcon
                            strokeWidth={2}
                            width={24}
                            height={24}
                        />
                    </p>
                </label>
            </div>
            <div className={styles["task-group"]}>
                <button
                    className="btn"
                    aria-label={`Update ${task.name} Task`}
                onClick={() => enterEditMode(task)}
                >
                    <PencilIcon
                        strokeWidth={2}
                        width={24}
                        height={24}
                    />
                </button>

                <button
                    className={`btn ${styles.delete}`}
                    aria-label={`Delete ${task.name} Task`}
                    onClick={() => deleteTask(task.id)}
                >
                    <TrashIcon
                        strokeWidth={10}
                        width={24}
                        height={24}
                    />
                </button>
            </div>
        </li>
    )
}
