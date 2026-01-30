"use client";
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getContactMessages, deleteContactMessage, markMessageAsRead } from '@/actions/admin-actions';
import { Mail, MailOpen, Trash2, Calendar, User, Phone, Tag, Search, Eye } from 'lucide-react';

export default function MessagesPage() {
    const { t, language } = useLanguage();
    const [messages, setMessages] = useState<any[]>([]);
    const [filteredMessages, setFilteredMessages] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<any>(null);

    useEffect(() => {
        loadMessages();
    }, []);

    useEffect(() => {
        const query = searchQuery.toLowerCase();
        const filtered = messages.filter(m =>
            m.name.toLowerCase().includes(query) ||
            m.email.toLowerCase().includes(query) ||
            (m.subject || "").toLowerCase().includes(query)
        );
        setFilteredMessages(filtered);
    }, [searchQuery, messages]);

    async function loadMessages() {
        setIsLoading(true);
        try {
            const data = await getContactMessages();
            setMessages(data);
            setFilteredMessages(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm(language === 'th' ? 'ยืนยันการลบข้อความนี้?' : 'Are you sure you want to delete this message?')) return;
        try {
            await deleteContactMessage(id);
            loadMessages();
            if (selectedMessage?.id === id) setSelectedMessage(null);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleMarkRead(id: string) {
        try {
            await markMessageAsRead(id);
            loadMessages();
            if (selectedMessage?.id === id) {
                setSelectedMessage({ ...selectedMessage, isRead: true });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder={language === 'th' ? 'ค้นหาขื่อผู้ติดต่อ หรือหัวข้อ...' : 'Search by name or subject...'}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-gray-900 placeholder:text-gray-400 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-xl">
                    <span className="font-bold text-primary">{filteredMessages.length}</span> {t.admin.messages_page.title}
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
                {/* Message List */}
                <div className={`${selectedMessage ? 'lg:col-span-5' : 'lg:col-span-12'} transition-all duration-300`}>
                    <div className="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{t.admin.messages_page.table_customer}</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{t.admin.messages_page.table_subject}</th>
                                        {!selectedMessage && (
                                            <>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{t.admin.messages_page.table_date}</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{t.admin.messages_page.table_status}</th>
                                            </>
                                        )}
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">{t.admin.messages_page.table_action}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                                    <span>Loading messages...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : filteredMessages.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                                {t.admin.messages_page.no_messages}
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredMessages.map((msg) => (
                                            <tr
                                                key={msg.id}
                                                className={`hover:bg-blue-50/30 transition-colors cursor-pointer ${!msg.isRead ? 'bg-blue-50/10' : ''}`}
                                                onClick={() => {
                                                    setSelectedMessage(msg);
                                                    if (!msg.isRead) handleMarkRead(msg.id);
                                                }}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${!msg.isRead ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-gray-100 text-gray-400'}`}>
                                                            {msg.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <div className={`text-sm font-bold ${!msg.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                                                                {msg.name}
                                                            </div>
                                                            <div className="text-xs text-gray-400">{msg.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className={`text-sm truncate max-w-[150px] ${!msg.isRead ? 'font-bold text-gray-800' : 'text-gray-500'}`}>
                                                        {msg.subject || (language === 'th' ? '(ไม่มีหัวข้อ)' : '(No Subject)')}
                                                    </div>
                                                </td>
                                                {!selectedMessage && (
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        {formatDate(msg.createdAt)}
                                                    </td>
                                                )}
                                                {!selectedMessage && (
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${!msg.isRead ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                                                            {!msg.isRead ? t.admin.messages_page.unread : t.admin.messages_page.read}
                                                        </span>
                                                    </td>
                                                )}
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            className="p-2 hover:bg-red-50 hover:text-red-500 text-gray-400 rounded-lg transition-colors"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDelete(msg.id);
                                                            }}
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Message Detail View */}
                {selectedMessage && (
                    <div className="lg:col-span-7 animate-fade-in-right">
                        <div className="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-gray-100 h-full flex flex-col overflow-hidden">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-primary/10 to-transparent p-8 border-b border-gray-50">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-primary/20">
                                            {selectedMessage.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{selectedMessage.name}</h3>
                                            <p className="text-gray-500">{selectedMessage.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedMessage(null)}
                                        className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all"
                                    >
                                        <Eye size={20} />
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/50 p-2 rounded-xl border border-white">
                                        <Phone size={16} className="text-primary" />
                                        <span className="font-bold">{selectedMessage.phone || '-'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/50 p-2 rounded-xl border border-white">
                                        <Calendar size={16} className="text-primary" />
                                        <span>{formatDate(selectedMessage.createdAt)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Message Body */}
                            <div className="flex-1 p-8 overflow-y-auto bg-slate-50/30">
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm min-h-[200px]">
                                    <div className="flex items-center gap-2 text-primary mb-4 pb-4 border-b border-gray-50">
                                        <Tag size={18} />
                                        <span className="font-bold text-lg">{selectedMessage.subject || (language === 'th' ? '(ไม่มีหัวข้อ)' : '(No Subject)')}</span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {selectedMessage.message}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="p-6 bg-white border-t border-gray-50 flex justify-end gap-3">
                                <button
                                    onClick={() => handleDelete(selectedMessage.id)}
                                    className="px-6 py-3 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 font-bold transition-all flex items-center gap-2"
                                >
                                    <Trash2 size={18} />
                                    {t.admin.messages_page.btn_delete}
                                </button>
                                <a
                                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || ''}`}
                                    className="px-8 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                                >
                                    <Mail size={18} />
                                    {language === 'th' ? 'ตอบกลับอีเมล' : 'Reply via Email'}
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
