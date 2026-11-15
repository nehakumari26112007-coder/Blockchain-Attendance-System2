import { useState } from "react";
import {
  getContract,
  getReadContract,
} from "./contract";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");

  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");

  const [attendanceId, setAttendanceId] = useState("");

  const [searchId, setSearchId] = useState("");
  const [studentData, setStudentData] =
    useState(null);

  const connectWallet = async () => {
    const accounts =
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

    setAccount(accounts[0]);
    return accounts[0];
  };

  const addStudent = async () => {
    try {
      await connectWallet();

      const contract =
        await getContract();

      const tx =
        await contract.addStudent(
          Number(studentId),
          studentName,
          branch,
          Number(semester),
          section,
          subject
        );

      await tx.wait();

      alert(
        "✅ Student Added Successfully"
      );

      setStudentId("");
      setStudentName("");
      setBranch("");
      setSemester("");
      setSection("");
      setSubject("");
    } catch (error) {
      console.log(error);

      alert(
        error.reason ||
          error.shortMessage ||
          error.message
      );
    }
  };

  const markPresent = async () => {
    try {
      await connectWallet();

      const contract =
        await getContract();

      const tx =
        await contract.markPresent(
          Number(attendanceId)
        );

      await tx.wait();

      alert("✅ Present Marked");
    } catch (error) {
      console.log(error);

      alert(
        error.reason ||
          error.shortMessage ||
          error.message
      );
    }
  };

  const markAbsent = async () => {
    try {
      await connectWallet();

      const contract =
        await getContract();

      const tx =
        await contract.markAbsent(
          Number(attendanceId)
        );

      await tx.wait();

      alert("❌ Absent Marked");
    } catch (error) {
      console.log(error);

      alert(
        error.reason ||
          error.shortMessage ||
          error.message
      );
    }
  };

  const searchStudent = async () => {
    try {
      const contract =
        getReadContract();

      const data =
        await contract.getStudent(
          Number(searchId)
        );

      setStudentData({
        name: data[0],
        branch: data[1],
        semester: data[2].toString(),
        section: data[3],
        subject: data[4],
        present: data[5].toString(),
        absent: data[6].toString(),
      });
    } catch (error) {
      console.log(error);

      alert(
        error.reason ||
          error.shortMessage ||
          error.message
      );
    }
  };

  return (
    <div className="container">
      <h1>
        ⛓️ Blockchain Attendance
        Management System
      </h1>

      <div className="card">
        <h2>👨‍🏫 Teacher Panel</h2>

        <input
          type="number"
          placeholder="🆔 Student ID"
          value={studentId}
          onChange={(e) =>
            setStudentId(
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="👤 Student Name"
          value={studentName}
          onChange={(e) =>
            setStudentName(
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="🎓 Branch"
          value={branch}
          onChange={(e) =>
            setBranch(
              e.target.value
            )
          }
        />

        <input
          type="number"
          placeholder="📚 Semester"
          value={semester}
          onChange={(e) =>
            setSemester(
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="🏫 Section"
          value={section}
          onChange={(e) =>
            setSection(
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="📖 Subject"
          value={subject}
          onChange={(e) =>
            setSubject(
              e.target.value
            )
          }
        />

        <button onClick={addStudent}>
          ➕ Add Student
        </button>
      </div>

      <div className="card">
        <h2>
          ✅ Attendance Panel
        </h2>

        <input
          type="number"
          placeholder="🆔 Student ID"
          value={attendanceId}
          onChange={(e) =>
            setAttendanceId(
              e.target.value
            )
          }
        />

        <button
          onClick={markPresent}
        >
          ✅ Mark Present
        </button>

        <button
          className="red"
          onClick={markAbsent}
        >
          ❌ Mark Absent
        </button>
      </div>

      <div className="card">
        <h2>🔍 Student Search</h2>

        <input
          type="number"
          placeholder="🔎 Enter Student ID"
          value={searchId}
          onChange={(e) =>
            setSearchId(
              e.target.value
            )
          }
        />

        <button
          onClick={searchStudent}
        >
          🔍 Search Student
        </button>

        {studentData && (
          <div className="profile">
            <h3>
              🎓 Student Profile
            </h3>

            <p>
              <b>👤 Name:</b>{" "}
              {studentData.name}
            </p>

            <p>
              <b>🎓 Branch:</b>{" "}
              {studentData.branch}
            </p>

            <p>
              <b>📚 Semester:</b>{" "}
              {
                studentData.semester
              }
            </p>

            <p>
              <b>🏫 Section:</b>{" "}
              {
                studentData.section
              }
            </p>

            <p>
              <b>📖 Subject:</b>{" "}
              {
                studentData.subject
              }
            </p>

            <p>
              <b>✅ Present:</b>{" "}
              {
                studentData.present
              }
            </p>

            <p>
              <b>❌ Absent:</b>{" "}
              {
                studentData.absent
              }
            </p>
          </div>
        )}
      </div>

      {account && (
        <div className="wallet">
          🔗 Wallet Connected
          <br />
          {account}
        </div>
      )}
    </div>
  );
}

export default App;