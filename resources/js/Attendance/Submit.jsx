import React from "react";
import Container from "@/Components/Container";
import { useForm } from "@inertiajs/react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Swal from "sweetalert2";
import Select2 from "@/Components/Select2";

export default function SubmitAttendance() {
    // destruct roles and user from usepage props
    // destruct roles from usepage props

    // define state with helper inertia
    const { data, setData, post, errors, processing } = useForm({
        latitude: "",
        longitude: "",
        description: "",
        selectedRoles: "",
    });
    navigator.geolocation.getCurrentPosition(
        function (position) {
            setData("latitude", position.coords.latitude);
            setData("longitude", position.coords.longitude);
        },
        function (error) {
            console.log("Error: " + error.message);
        }
    );

    // define method handleSelectedroles
    const formattedRoles = [
        {
            value: "attend",
            label: "Hadir",
        },
        {
            value: "sick",
            label: "Sakit",
        },
        {
            value: "permit",
            label: "Izin",
        },
        {
            value: "leave",
            label: "Cuti",
        },
    ];
    // 'attend', 'sick', 'permit', 'leave'

    const handleSelectedRoles = (selected) => {
        const selectedValue = selected ? selected.value : null;

        setData("selectedRoles", selectedValue);
    };

    // define method handleStoreData
    const handleStoreData = async (e) => {
        e.preventDefault();

        post(route("attendance.submit"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "Data created successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
        });
    };

    return (
        <Container>
            <Card title={"Abensi"}>
                {!data.longitude && (
                    <div className="text-xs text-red-500 mt-1">
                        Latitude Longtitude Belum siap
                    </div>
                )}
                {/* {data.longitude && (
                    <div className="text-green-500 mt-1">
                        Latitude: {data.latitude}, Longitude: {data.longitude}
                    </div>
                )} */}
                <form onSubmit={handleStoreData}>
                    <div className="mb-4 w-1/2">
                        <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                            Roles
                        </div>
                        <Select2
                            onChange={handleSelectedRoles}
                            defaultOptions={data.filterRole}
                            options={formattedRoles}
                            single={true}
                            placeholder="Pilih Role..."
                        />
                        {errors.selectedRoles && (
                            <div className="text-xs text-red-500 mt-1">
                                {errors.selectedRoles}
                            </div>
                        )}
                    </div>
                    {data.selectedRoles != "attend" && (
                        <div className="mb-4 w-1/2">
                            <Input
                                label={"Description"}
                                type={"text"}
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                errors={errors.description}
                                placeholder="Input description .."
                            />
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <Button
                            type={"submit"}
                            processing={processing}
                            title={"Kirim Absen"}
                        />
                    </div>
                </form>
            </Card>
        </Container>
    );
}
