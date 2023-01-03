import React from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'

export const EditForm = ({ editedTask, updateTask, closeEditMode }) => {

    const [updatedTaskName, setUpdatedTaskName] = useState(editedTask.name);


    useEffect(() => {
        const closeModal = (e) => {
            e.key === "Escape" && closeEditMode()
        }

        window.addEventListener("keydown", closeModal)

        return () => {
            window.removeEventListener("keydown", closeModal)
        }
    }, [closeEditMode])


    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateTask({ ...editedTask, name: updatedTaskName })
    }

    return (
        <div
            role="dialog"
            aria-labelledby="editTask"
            onClick={(e) => {e.target === e.currentTarget && closeEditMode() }}
        >
            <form
                className='todo'
                onSubmit={handleFormSubmit}
            >
                <div className="wrapper">
                    <input
                        type="text"
                        id="editTask"
                        className="input"
                        required
                        autoFocus
                        maxLength={60}
                        placeholder="Update task"
                        value={updatedTaskName}
                        onInput={(e) => setUpdatedTaskName(e.target.value)}
                    />
                    <label
                        htmlFor="editTask"
                        className="label"
                    >
                        Update Task
                    </label>
                </div>
                <button
                    className="btn"
                    aria-label={`Confirm edited task to now ${updatedTaskName}`}
                    type="submit"
                >
                    <CheckIcon
                        strokeWidth={2}
                        width={24}
                        height={24}
                    />
                </button>
            </form>
        </div>
    )
}