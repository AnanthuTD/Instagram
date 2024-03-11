import React, { useState, useEffect } from "react";
import {
	Modal,
	Input,
	Divider,
	Avatar,
	Typography,
	Row,
	Button,
	List,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Search: AntdSearch } = Input;
const { Title, Text } = Typography;
const { Item } = List;

interface SearchResult {
	type: string;
	username?: string;
	profile_pic?: string;
	hashtag?: string;
	total_posts?: number;
	first_name?: string;
	last_name?: string;
}

const SearchModal: React.FC<{ visible: boolean; onClose: () => void }> = ({
	visible,
	onClose,
}) => {
	const [searchText, setSearchText] = useState<string>("");
	const [recentSearches, setRecentSearches] = useState<string[]>([]);
	const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

	useEffect(() => {
		fetchRecentSearches();
	}, []);

	const fetchRecentSearches = async () => {
		try {
			const response = await fetch("/api/recent-searches");
			const data = await response.json();
			setRecentSearches(data);
		} catch (error) {
			console.error("Error fetching recent searches:", error);
		}
	};

	const handleSearch = async (value: string) => {
		try {
			setSearchText(value);
			if (value.trim() !== "") {
				const response = await fetch(`/api/search?query=${value}`);
				const data = await response.json();
				setSearchResults(data.results);
			} else {
				setSearchResults([]);
			}
		} catch (error) {
			console.error("Error searching:", error);
		}
	};

	useEffect(() => {
		handleSearch(searchText);
	}, [searchText]);

	const handleClearRecentSearch = async (index: number) => {
		try {
			const updatedRecentSearches = [...recentSearches];
			updatedRecentSearches.splice(index, 1);
			setRecentSearches(updatedRecentSearches);
		} catch (error) {
			console.error("Error clearing recent search:", error);
		}
	};

	const handleClearAll = async () => {
		try {
			await fetch("clear-recent-searches", {
				method: "DELETE",
			});
			setRecentSearches([]);
		} catch (error) {
			console.error("Error clearing recent searches:", error);
		}
	};

	const renderContent = () => {
		return (
			<div className="p-2">
				<Row justify="space-between">
					<Title level={5} className="mb-2">
						{searchText.trim() === "" ? "Recent" : "Search Results"}
					</Title>
					{searchText.trim() === "" && recentSearches.length > 0 && (
						<Button
							type="text"
							onClick={handleClearAll}
							className="text-instaBlue mb-2 font-semibold"
						>
							Clear all
						</Button>
					)}
				</Row>
				<List
					dataSource={
						searchText.trim() === "" ? recentSearches : searchResults
					}
					renderItem={(item: SearchResult, index: number) => (
						<Item key={index}>
								<Link href={`/posts/${item.hashtag}`}>
							<Row align="middle" gutter={[16, 0]}>
									{item.type === "profile" ? (
										<Avatar src={item.profile_pic} />
									) : (
										<Avatar
											style={{
												// backgroundColor: "#f56a00",
												verticalAlign: "middle",
											}}
											size="large"
										>
											#
										</Avatar>
									)}
									<div className="mx-2"></div>
									<Text className="text-sm">{item?.hashtag}</Text>
									{item.type !== "profile" && (
										<Text className="text-sm">
											Posts: {item.total_posts}
										</Text>
									)}
									{item.first_name && item.last_name && (
										<Text type="secondary" className="text-xs">
											{`${item.first_name} ${item.last_name}`}
										</Text>
									)}
									{searchText.trim() === "" && (
										<Button
											type="text"
											icon={<CloseOutlined />}
											onClick={() => handleClearRecentSearch(index)}
										/>
									)}
							</Row>
								</Link>
						</Item>
					)}
				/>
			</div>
		);
	};

	return (
		<Modal
			open={visible}
			onCancel={onClose}
			footer={null}
			centered
			destroyOnClose
			width={500}
		>
			<div className="p-4 flex flex-col" style={{ height: "80vh" }}>
				<div className="flex items-center justify-between mb-4">
					<Title level={4}>Search</Title>
				</div>
				<Divider />
				<AntdSearch
					placeholder="Search"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					onSearch={handleSearch}
					allowClear
					className="mb-4"
				/>
				<Divider />
				<div className="flex-grow overflow-y-auto">{renderContent()}</div>
			</div>
		</Modal>
	);
};

export default SearchModal;
